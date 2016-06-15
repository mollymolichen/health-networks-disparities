#@author: ShebleAdmin

#//convert the occurred csv file to json format
#//uses nae of imput file to name output file
#//input file name, path need to be u pdated for files
#//python 2.7, python 3 is most recent

from __future__ import print_function
from __future__ import division

import csv
import json
import os

csvFileName = "edge_list.csv"
path = ""

jsonFileName = csvFileName.rstrip(".csv") + ".json"
csvIn = os.path.join(path, csvFileName)
jsonOut = os.path.join(path, jsonFileName)

csvFile = open(csvIn, "r")
jsonFile = open(jsonOut, "w")

fieldnames = ('source','target')
reader = csv.DictReader(csvFile, fieldnames)

for row in reader:
    json.dump(row, jsonFile, sort_keys = True, indent = 2)
    jsonFile.write(',\n')

csvFile.close()
jsonFile.close()