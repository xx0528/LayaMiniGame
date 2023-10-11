export default class MultiplePassOutlineMaterial extends Laya.BaseMaterial {
    /**
     * @private
     */
    static __init__() {
    }
    /**
     * 获取漫反射贴图。
     * @return 漫反射贴图。
     */
    get albedoTexture() {
        return this._shaderValues.getTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE);
    }

    /**
     * 设置漫反射贴图。
     * @param value 漫反射贴图。
     */
    set albedoTexture(value) {
        this._shaderValues.setTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE, value);
    }
    /**
     * 获取线条颜色
     * @return 线条颜色
     */
    get outlineColor() {
        return this._shaderValues.getVector(MultiplePassOutlineMaterial.OUTLINECOLOR);
    }

    set outlineColor(value) {
        this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, value);
    }

    /**
    * 设置偏移方向。
    * @param value 偏移方向 -1,1
    */
    offsetDir(value) {
        value = value/Math.abs(value);
        // Laya.Tween.to(MultiplePassOutlineMaterial,{OffSetDir:value},1000);
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OffSetDir, value);
    }

    /**
     * 获取轮廓宽度。
     * @return 轮廓宽度,范围为0到0.05。
     */
    get outlineWidth() {
        return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH);
    }

    /**
     * 设置轮廓宽度。
     * @param value 轮廓宽度,范围为0到0.05。
     */
    set outlineWidth(value) {
        value = Math.max(0.0, Math.min(0.05, value));
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, value);
    }

    /**
     * 获取轮廓亮度。
     * @return 轮廓亮度,范围为0到1。
     */
    get outlineLightness() {
        return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS);
    }

    /**
     * 设置轮廓亮度。
     * @param value 轮廓亮度,范围为0到1。
     */
    set outlineLightness(value) {
        value = Math.max(0.0, Math.min(1.0, value));
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, value);
    }


    static initShader() {
        MultiplePassOutlineMaterial.__init__();
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OffSetDir': Laya.Shader3D.PERIOD_MATERIAL,
        };

        var customShader = Laya.Shader3D.add("MultiplePassOutlineShader");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        customShader.addSubShader(subShader);
        let vs1 = `
        attribute vec4 a_Position;
        attribute vec3 a_Normal;
        
        uniform mat4 u_MvpMatrix; 
        uniform float u_OutlineWidth;
        uniform float u_OffSetDir;

        
        void main() 
        {
           vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);
           gl_Position = u_MvpMatrix * position;
           if(gl_Position.z>=30.0){
            gl_Position.x +=(gl_Position.z)*(gl_Position.z)/600.0;
        }
           
        }`;

        let ps1 = `
        #ifdef FSHIGHPRECISION
            precision highp float;
        #else
           precision mediump float;
        #endif
        uniform vec4 u_OutlineColor; 
        uniform float u_OutlineLightness;
    
        void main()
        {
           vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness;
           gl_FragColor = vec4(finalColor,0.0); 
        }`;

        var pass1 = subShader.addShaderPass(vs1, ps1);
        pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
        let vs2 = `
        #include "Lighting.glsl"

        attribute vec4 a_Position; 
        attribute vec2 a_Texcoord0;
        
        uniform mat4 u_MvpMatrix;
        uniform mat4 u_WorldMat;
        uniform float u_OffSetDir;        
        
        attribute vec3 a_Normal; 
        varying vec3 v_Normal; 
        varying vec2 v_Texcoord0; 
        
        void main() 
        {
           gl_Position = u_MvpMatrix * a_Position;
           mat3 worldMat=mat3(u_WorldMat); 
           v_Normal=worldMat*a_Normal; 
           v_Texcoord0 = a_Texcoord0;
           if(gl_Position.z>=30.0){
                gl_Position.x +=(gl_Position.z)*(gl_Position.z)/600.0*u_OffSetDir;
           }
           gl_Position=remapGLPositionZ(gl_Position); 
        }`;
        let ps2 = `
        #ifdef FSHIGHPRECISION
            precision highp float;
        #else
            precision mediump float;
        #endif
        varying vec2 v_Texcoord0;
        varying vec3 v_Normal;
        
        uniform sampler2D u_AlbedoTexture;
        
        
        void main()
        {
           vec4 albedoTextureColor = vec4(1.0);
           
           albedoTextureColor = texture2D(u_AlbedoTexture, v_Texcoord0);
           gl_FragColor=albedoTextureColor;
        }`;

        subShader.addShaderPass(vs2, ps2);
    }



    constructor() {
        super();
        this.setShaderName("MultiplePassOutlineShader");
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, 0);
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, 1);
        this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, new Laya.Vector4(0.0, 0.0, 0.0, 0.0));
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OffSetDir,1);
    }
    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static OUTLINECOLOR = Laya.Shader3D.propertyNameToID("u_OutlineColor");
    public static OUTLINEWIDTH = Laya.Shader3D.propertyNameToID("u_OutlineWidth");
    public static OUTLINELIGHTNESS = Laya.Shader3D.propertyNameToID("u_OutlineLightness");
    public static OffSetDir = Laya.Shader3D.propertyNameToID("u_OffSetDir");
}




