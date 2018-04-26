import csv
import json

def main():
    hurricaneKeyWords = ["hurricane", "flood", "houston", "texas", "storm"]
    weinsteinKeyWords = ["weinstein", "assault", "harassment", "metoo"]
    results = []
    with open("harvey2.csv", encoding='mac_roman') as csvfile:
        reader = csv.reader(csvfile) # change contents to floats
        for row in reader: # each row is a list
            results.append(row)

    # newResults = [{"index":1, "HI": 2}]
    # newResults.append({"index": 3, "HI": 4})
    # print(newResults[1]["index"])
    newResults = []
    resultsCount = 0
    for row in results:
        newResults.append({"index": row[0], "id": row[1], "date":  row[2], "text": row[3], "url": row[4], "location": row[5]})
        resultsCount += 1
    del results

    hurricaneTweets = []
    weinsteinTweets = []
    hurricaneCount = 0
    weinsteinCount = 0
    for row in newResults:
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

    with open('hurricane.json', 'w') as outfile:
        json.dump(hurricaneTweets, outfile, indent=4, sort_keys=True,)

    with open('weinstein.json', 'w') as outfile:
        json.dump(weinsteinTweets, outfile, indent=4, sort_keys=True,)

    print(resultsCount)
    print(hurricaneCount)
    print(weinsteinCount)

if __name__ == '__main__':
    main()
