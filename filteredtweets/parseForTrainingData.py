import csv
import json

def main():
    hurricaneKeyWord = "hurricane"
    weinsteinKeyWord = "weinstein"
    results = []
    with open("harvey2.csv", encoding='mac_roman') as csvfile:
        reader = csv.reader(csvfile) # change contents to floats
        print("Parsing")
        for row in reader: # each row is a list
            results.append(row)

    # newResults = [{"index":1, "HI": 2}]
    # newResults.append({"index": 3, "HI": 4})
    # print(newResults[1]["index"])
    newResults = []
    resultsCount = 0
    exceptions = 0
    print("Copying Data")
    for row in results:
        try:
            newResults.append({"index": row[0], "id": row[1], "date":  row[2], "text": row[3], "url": row[4], "location": row[5]})
            resultsCount += 1
        except:
            exceptions += 1
    del results

    hurricaneTweets = []
    weinsteinTweets = []
    noMatch = []
    bothCount = 0
    noMatchCount = 0
    hurricaneCount = 0
    weinsteinCount = 0
    print("Searching for key words")
    for n,row in enumerate(newResults):
        if hurricaneKeyWord in row["text"].lower() and weinsteinKeyWord in row["text"].lower():
            bothCount += 1
        elif hurricaneKeyWord in row["text"].lower():
            hurricaneTweets.append(row)
            hurricaneCount += 1
        elif weinsteinKeyWord in row["text"].lower():
            weinsteinTweets.append(row)
            weinsteinCount += 1
        else:
            noMatch.append(row)
            noMatchCount += 1
    del newResults

    B = hurricaneTweets[0:int(len(hurricaneTweets)/2)]
    C = hurricaneTweets[int(len(hurricaneTweets)/2):int(len(hurricaneTweets))+1]

    with open('hurricane0.json', 'w') as outfile:
        print("Writing hurricane0.json")
        json.dump(B, outfile, indent=4, sort_keys=True,)

    with open('hurricane1.json', 'w') as outfile:
        print("Writing hurricane1.json")
        json.dump(C, outfile, indent=4, sort_keys=True,)

    with open('weinstein0.json', 'w') as outfile:
        print("Writing weinstein.json")
        json.dump(weinsteinTweets, outfile, indent=4, sort_keys=True,)

    B = noMatch[0:int(len(noMatch)/2)]
    C = noMatch[int(len(noMatch)/2):int(len(noMatch))+1]

    with open('noMatch0.json', 'w') as outfile:
        print("Writing noMatch0.json")
        json.dump(B, outfile, indent=4, sort_keys=True)

    with open('noMatch1.json', 'w') as outfile:
        print("Writing noMatch1.json")
        json.dump(C, outfile, indent=4, sort_keys=True)

    print("Total Results: %s" % (resultsCount))
    print("Excepted: %s" % (exceptions))
    print("Hurricane Results: %s" % (hurricaneCount))
    print("Weinstein Results: %s" % (weinsteinCount))
    print("NoMatch Results: %s" % (noMatchCount))

if __name__ == '__main__':
    main()
