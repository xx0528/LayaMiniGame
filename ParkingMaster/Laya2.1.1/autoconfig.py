#!/usr/bin/python
#coding=utf-8

import sys
import os
import string
import re
import json

def replaceJsonFile(filename, cfg):
	load_dict = None
	with open(filename, 'rb') as load_f:
		load_dict = json.load(load_f)
		for _c in cfg:
			if _c in load_dict: load_dict[_c] = cfg[_c]

	with open(filename, 'wb') as dump_f:
		json.dump(load_dict, dump_f)

def replaceFile(filename, cfg):
	fp = open(filename, 'rb')
	lines = fp.readlines()
	fp.close()
	print filename
	for line in lines:
		for _c in cfg:
			if line.find(_c.encode('utf-8')) >= 0 and line.find("=") > 0:
				print _c
				# rep = re.sub(r'=.*;', cfg[_c], line)
				# if rep:
				# 	print rep
				break

def replace(filename, cfg):
	if os.path.splitext(filename)[-1][1:] == 'json':
		replaceJsonFile(filename, cfg)
	else:
		replaceFile(filename, cfg)

def config(filename):
	with open(filename, 'r') as load_f:
		load_dict = json.load(load_f)
		# print load_dict
		for cfg in load_dict:
			replace(cfg['filename'], cfg['config'])

if __name__ == '__main__':
	config("renyou.config.json")
