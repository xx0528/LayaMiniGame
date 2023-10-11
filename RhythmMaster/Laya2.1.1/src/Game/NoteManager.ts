export default class NoteManager {
    private static _instance: NoteManager;

    public static get Instance(): NoteManager {
        return this._instance ? this._instance : this._instance = new NoteManager();
    }

    private _songNote: SongNote = null;

    public get songNote(): SongNote {
        return this._songNote;
    }

    public Load(url, caller, completed): void {
        Laya.loader.load(url, Laya.Handler.create(this, () => {
            let json = Laya.loader.getRes(url);
            if (json == null) {
                console.log("访问Song节奏文件资源失败！" + url);
                return;
            }
            this.LoadJson(Laya.loader.getRes(url));
            if (completed != null) {
                completed.call(caller);
            }
        }), null, Laya.Loader.JSON)
    }

    public LoadJson(json) {
        if (json == null) {
            return;
        }
        
        let time = json["time"];
        let notes = json["note"];
        if (notes.length == 0) {
            return;
        }
        let bpm = time[0].bpm;
        let partBeat = notes[0].beat[2];
        let beatTime = 60 / (time[0].bpm * partBeat);
        let beatDelay = notes[notes.length - 1].offset / 1000;

        let songNote = new SongNote(time[0].bpm, this.AnalyzeTransformNoteTest(notes, bpm), beatDelay);
        songNote.songName = notes[notes.length - 1].sound;
        this._songNote = songNote;
    }

    private AnalyzeTransformNote(notes, partBeat, beatTime): Array<any> {
        let oldBeatIndex = null;
        let beatAllNotes: Array<any> = null;
        let AllBeats: Array<Beat> = new Array;
        for (let i = 0; i < notes.length - 1; i++) {
            let note = notes[i];
            let noteIndex = note.beat[0]
            let beatIndex = (noteIndex * partBeat + note.beat[1]);
            let columnIndex = note.column;
            let timeAppear = beatIndex * beatTime;

            if (oldBeatIndex != beatIndex) {
                beatAllNotes = new Array;
                oldBeatIndex = beatIndex;
                AllBeats.push(new Beat(beatAllNotes, NoteManager.guidIndex++));
            }
            beatAllNotes.push(new Note(columnIndex, timeAppear))
        }
        return AllBeats;
    }

    private static guidIndex = 0;
    private AnalyzeTransformNoteTest(notes, bpm): Array<any> {
        let oldBeatIndex = null;
        let beatAllNotes: Array<any> = null;
        let AllBeats: Array<Beat> = new Array;
        for (let i = 0; i < notes.length - 1; i++) {
            let note = notes[i];
            let beat = note.beat;
            let columnIndex = note.column;
            let beatIndex = (note.beat[0] * note.beat[2] + note.beat[1]);
            let timeAppear = beatIndex * (60 / (bpm * note.beat[2]) );

            if (oldBeatIndex != timeAppear) {
                beatAllNotes = new Array;
                oldBeatIndex = timeAppear;
                AllBeats.push(new Beat(beatAllNotes, NoteManager.guidIndex++));
            }
            beatAllNotes.push(new Note(columnIndex, timeAppear))
        }
        return AllBeats;
    }

    public GetBeat(index: number): Beat {
        return this.songNote.beats[index];
    }

    public GetBeatTimeAppear(index: number): number {
        return this.songNote.beats[index].timeAppear;
    }
}

export class SongNote {
    public bpm: number = 0;
    public beatDelay: number = 0;
    public beats: Array<Beat> = null;
    public songName: string = ""
    constructor(bpm, beats, beatDelay = 0) {
        this.beats = beats;
        this.bpm = bpm;
        this.beatDelay = beatDelay == null ? 0 : beatDelay;
    }

    public clone(): SongNote {
        let bpm = this.bpm;
        let beatDelay = this.beatDelay;
        let notes: Array<Beat> = new Array;
        for (let i = 0; i < this.beats.length; i++) {
            notes.push(this.beats[i]);
        }
        return new SongNote(bpm, notes, beatDelay);
    }
}

export class Beat {
    public guid: number = 0;
    public notes: Array<Note> = null;

    constructor(notes, guid: number = 0) {
        this.notes = notes;
        this.guid = guid;
    }

    public get timeAppear(): number {
        return this.notes[0].timeAppear;
    }

    public GetColumnGroup(column): Note {
        for (let i = 0; i < this.notes.length; i++) {
            if (this.notes[i].columnIndex == column)
                return this.notes[i];
        }
        return null;
    }
}

export class Note {
    public noteIndex: number = 0;
    public columnIndex: number = 0;
    public timeAppear: number = 0;
    constructor(columnIndex, timeAppear) {
        this.columnIndex = columnIndex;
        this.timeAppear = timeAppear;
    }
}