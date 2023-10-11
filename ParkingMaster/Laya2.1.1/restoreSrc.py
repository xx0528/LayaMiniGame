#!/usr/bin/python
#coding=utf-8

import sys
import os

if __name__ == '__main__':
	if len(sys.argv) > 1:
		os.chdir(sys.argv[1])
	
	os.system("git checkout src")
