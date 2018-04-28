import csv
import json

def main():
    hurricaneKeyWords = ["hurricane"]
    weinsteinKeyWords = ["weinstein"]
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
    hurricaneCount = 0
    weinsteinCount = 0
    print("Searching for key words")
    for n,row in enumerate(newResults):
        for word in hurricaneKeyWords:
            if word in row["text"].lower():
                hurricaneTweets.append(row)
                hurricaneCount += 1
                break
        for word in weinsteinKeyWords:
            if word in row["text"].lower():
                weinsteinTweets.append(row)
                weinsteinCount += 1
                break
        if n>500000:
            break
    del newResults

    with open('hurricane.json', 'w') as outfile:
        print("Writing hurricane.json")
        json.dump(hurricaneTweets, outfile, indent=4, sort_keys=True,)

    with open('weinstein.json', 'w') as outfile:
        print("Writing weinstein.json")
        json.dump(weinsteinTweets, outfile, indent=4, sort_keys=True,)

    print("Total Results: %s" % (resultsCount))
    print("Excepted: %s" % (exceptions))
    print("Hurricane Results: %s" % (hurricaneCount))
    print("Weinstein Results: %s" % (weinsteinCount))

if __name__ == '__main__':
    main()
