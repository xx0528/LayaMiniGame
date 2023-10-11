#!/usr/bin/python
#coding=utf-8

import sys
import os
import string
import random
import re

dirIgnore = [
	'ParkingJam',
]

filesIgnore = [
	'layaMaxUI.ts',
	'GameConfig.ts',
	'aes.js'
]

regxs = [
	{'regx': 'export enum ', 'key': 'enum'},
	{'regx': 'export default class ', 'key': 'class'},
	{'regx': 'export class ', 'key': 'class'},
]

blankVar = [
	'create',
	'set',
	'get',
	'encrypt',
	'decrypt',
	'init',
	'constructor',
	'push',
	'setValue',
	'None',
	'start',
	'clone',
	'refresh',
	'play',
	'pause',
]

blankClass = [
	'laya',
	'Laya',
	'Laya3D',
	'CryptoJS',
	'LoadingUI',
	'JSON',
	'wx',
	'play',
	'Graphics',
	'graphics'
]

def dotSplitBlankClass(content, filters):
	_continue = False
	for _bc in blankClass:
		if content.find(_bc) >= 0:
			_continue = True
	if not _continue: return

	canPrint = False
	if content.find("getQueryString") >= 0:
		canPrint = True

	_c = content.strip()
	_splited = _c.split('.')
	filtering = False
	for _v in _splited:
		if filtering:
			if _v.isalnum():
				filters.append(_v)
			else:
				_t = re.split('[ =(]', _v, 1)
				if _t and _t[0].isalnum():
					filters.append(_t[0])
					filtering = False
				_t = re.split('\[', _v, 1)
				if _t and _t[0].isalnum():
					filters.append(_t[0])
				continue
		else:
			for _bc in blankClass:
				if _v.find(_bc) >= 0:
					filtering = True
					break

def classFilter(var, filters):
	for _bc in blankClass:
		if _bc == var:
			return True
	for _f in filters:
		if _f == var:
			return True
	return False

def varFilter(var):
	for _b in blankVar:
		if var == _b:
			return True
	return False

def varsFilter(var, _vars):
	for v in _vars:
		if v == _vars:
			return True
	return False

def isFileIgnore(path):
	for f in filesIgnore:
		if path.find(f) >= 0:
			return True
	return False

def isDirIgnore(path):
	for d in dirIgnore:
		if path.find(d) >= 0:
			return True
	return False

def getRandomLetter():
	return '_'+random.choice(string.letters)+random.choice(string.letters)+random.choice(string.letters)+random.choice(string.letters)

def dumpRep(reps):
	for _r in reps:
		print _r

symbols = [
	'\"',
	'/',
]
def symbolFilter(val):
	for s in symbols:
		if val == s:
			return True
	return False

def splitReplace(line, _var, _replace, changed = "", isReplaced = False):
	splited = line.split(_var, 1)
	if len(splited) == 1:
		changed += line
		return changed,isReplaced
	else:
		if splited[0][-1:].isalnum() or splited[1][:1].isalnum() or symbolFilter(splited[0][-1:]) or symbolFilter(splited[1][:1]):
			changed += splited[0] + _var
		else:
			changed += splited[0] + _replace
			isReplaced = True
		return splitReplace(splited[1], _var, _replace, changed, isReplaced)


def uglify(_dir):
	templets = []
	filterVars = []
	blankFilters = []
	for dirpath, dirnames, filenames in os.walk(_dir):
		for filename in filenames:
			path = os.path.join(dirpath, filename)
			if isFileIgnore(path):
				continue
			if isDirIgnore(path):
				continue
			createMapNode(path, templets, filterVars, blankFilters)

	filterVars = list(set(filterVars))
	blankFilters = list(set(blankFilters))
	needRep = []
	for t in templets:
		for _r in t['reps']:
			_var = _r['var']
			if varFilter(_var): continue
			if classFilter(_var, blankFilters): continue
			if varsFilter(_var, filterVars): continue
			#TODO 方法名和类名重复的过滤
			#记录当前替换名行号，对比有无重复命名的变量，有则剔除
			if len(needRep) == 0:
				needRep.append(_r)
			else:
				canInsert = True
				for _nr in needRep:
					if _nr['var'] == _var:
						canInsert = False
				if canInsert:
					needRep.append(_r)
	# print '\n\n\n\n\n\n\n\nneedRep:\n'
	# dumpRep(needRep)
	# dumpRep(blankFilters)
	# _file = 'bin/js/bundle.js'
	# fp = open(_file)
	# lines = fp.readlines()
	# fp.close()
	for dirpath, dirnames, filenames in os.walk(_dir):
		for filename in filenames:
			path = os.path.join(dirpath, filename)
			if isFileIgnore(path):
				continue
			fp = open(path)
			lines = fp.readlines()
			fp.close()
			isReplaced = False
			for i in range(len(lines)):
				line = lines[i]
				for _r in needRep:
					_var = _r['var']
					if 'type' in _r and (_r['type'] == 'class' or _r['type'] == 'enum'):
						continue
					else:
						if _var:
							(line, _isReplaced) = splitReplace(line, _var, _r['var_replace'])
							if not isReplaced:
								isReplaced = _isReplaced
							lines[i] = line
						
			if isReplaced:
				fp = open(path, 'wb')
				fp.writelines(lines)
				fp.close()
			

def createMapNode(path, templets, filterVars, blankFilters):
	comments = 0
	lastScope = 0
	fp = open(path)
	lines = fp.readlines()
	fp.close()

	for i in range(len(lines)):
		v = lines[i]
		dotSplitBlankClass(v, blankFilters)
		if len(templets) > 0 and templets[len(templets) - 1]['scope'] != None:
			t = templets[len(templets) - 1]
			vStrip = v.strip()
			if v.find("/**") >= 0: comments += 1
			if v.find("{") >= 0: t['scope'] += v.count("{")
			if v.find("}") >= 0: t['scope'] -= v.count("}")
			if v.find("Randon_YZFC_Move") >= 0:
				print 'jacky->%s lastScope->%d scope->%d comments->%d'%(v, lastScope, t['scope'], comments)
			if t['scope'] > 1: 
				if t['scope'] == 2 and lastScope == 1: #特殊情况和命名在一行则多检查一次
					pass
				else:
					continue #只遍历子集不进入函数内
			# if v.strip().find('//') == 0: continue #过滤单行注释
			# if comments > 0: continue #过滤多行注释
			# if comments == 0 and v.find("/*") >= 0: continue
			lastScope = t['scope']

			letter = getRandomLetter()
			if t['type'] == 'enum':
				var = None
				if vStrip.find('=') > 0:
					var = vStrip[:vStrip.find('=')-1].strip()
				elif vStrip.find(',') > 0:
					var = vStrip[:vStrip.find(',')-1].strip()
				elif vStrip.find('}') > 0:
					var = vStrip[:vStrip.find('}')-1].strip()
				if var != None:
					t['reps'].append({'var': var, 'var_replace': letter})
			elif t['type'] == 'class':
				var = None
				isFunc = False
				
				if vStrip.find('(') > 0:
					if vStrip.find('=') < 0 or vStrip.find(':') < 0 or vStrip.find('(') < vStrip.find('=') or vStrip.find('(') < vStrip.find(':'):
						var = vStrip[:vStrip.find('(')]
					isFunc = True
				elif vStrip.find(':') > 0:
					ret = re.match(r'^(.*):', vStrip)
					if ret:
						var = ret.group(1).strip()
				elif vStrip.find('=') > 0:
					ret = re.match(r'^(.*)=', vStrip)
					if ret:
						var = ret.group(1).strip()

				if var and not var.isalnum():
					splited = var.split(' ')
					if splited:
						var = splited[len(splited) - 1]

				if var and (var.isalnum() or var.replace('_', '').isalnum()) and var.find('on') != 0:
					if isFunc:
						t['reps'].append({'var': var, 'var_replace': letter})
					else:
						filterVars.append(var)

			if v.find("*/") >= 0: comments -= 1
			if t['scope'] == 0: t['scope'] = None;dumpRep(t['reps'])
		else:
			for s in regxs:
				t = {}
				if v.find(s['regx']) >= 0:
					_tv = v.split(s['regx'])[1]
					if (_tv.find('extends') >= 0):
						_tv = _tv.split('extends')[0]
					if (_tv.find('{') >= 0):
						_tv = _tv.split('{')[0]
					t['obj'] = _tv.strip()
					t['scope'] = 0
					t['reps'] = [{'var': t['obj'], 'var_replace': getRandomLetter(), 'type': s['key']}]
					t['type'] = s['key']
					# print 't->' + str(t)
					templets.append(t)

				if 'scope' in t:
					if v.find("{") >= 0:
						t['scope'] += 1
					break
	if len(templets) > 0 and templets[len(templets) - 1]['scope'] != None:
		templets[len(templets) - 1]['scope'] = None


if __name__ == '__main__':
	if len(sys.argv) > 1:
		os.chdir(sys.argv[1])
	
	uglify('src')
