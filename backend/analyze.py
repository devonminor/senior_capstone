
import re

import pandas as pd
from kneed import KneeLocator
from nltk.tokenize import TweetTokenizer
from scipy.spatial import distance
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from word2number import w2n

# Steps for clustering student responses
#   1. Load the data (create a file with a bunch of potential responses to a single question)
#   2. Process the data (check the spelling of each response, potentially remove stop words, remove punctuation, group like terms (ex. lbs, LBS, pounds), etc.)
#   3. Vectorize the data (convert the responses into a vector of numbers)
#   4. Cluster the data (use k-means to cluster the responses into groups)
#   5. Display the results (print out the clusters and the responses in each cluster)


def process_data(responses):
    processed_responses = []
    for response in responses:
        processed_response = response.lower()
        processed_responses.append(processed_response)
    return processed_responses


def convert_text_numbers_to_numeric_numbers(sentence):
    """
    Convert all text numbers in a string to numeric numbers
    """
    to_num_arr = []
    for word in sentence.split():
        try:
            conversion = w2n.word_to_num(word)
            if (conversion != None):
                # loop through remaining words of the sentence
                to_num_arr.append(conversion)
        except:
            to_num_arr.append(word)
            continue
    return (" ".join(str(x) for x in to_num_arr))


def standardize_number(text):
    # split elements via digits
    elems = re.split(r'(\d+)', text)
    split_array = []

    count = 0
    while count < len(elems):
        elems[count] = elems[count].strip()

        # starts by checking if word is number
        if elems[count].isdigit():

            # checks edge case (end of answer cases)
            if (len(elems) - 2) <= count:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1

            # checks if number is a float
            elif elems[count+1] == '.' and elems[count+2].isdigit():
                rounded_num = round(
                    float("".join([elems[count], elems[count+1], elems[count+2]])), 3)
                split_array.append(str(rounded_num))
                count += 3

            # checks if number is a fraction
            elif elems[count+1] == '/' and elems[count+2].isdigit():
                rounded_num = round(
                    (float(elems[count])) / (float(elems[count+2])), 3)
                split_array.append(str(rounded_num))
                count += 3

            # if its just a normal int
            else:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1

        # if a number is less than 1
        elif elems[count] == '.':
            if (len(elems) - 1) <= count:
                count += 1
            elif elems[count+1].isdigit():
                rounded_num = round(
                    float("".join([elems[count], elems[count+1]])), 3)
                split_array.append(str(rounded_num))
                count += 2

        # if parsed string is not a number
        else:
            get_string = re.sub('[^A-Za-z0-9]+', " ", elems[count])
            if not get_string.isspace():
                split_array.append(get_string)
            count += 1

    return (" ".join(split_array)).strip()


def cluster_list(words_list_param=None):
    if words_list_param is None:
        return []

    # Initialize tweeker
    tk = TweetTokenizer()
    count_vectorizer = CountVectorizer(stop_words=[], tokenizer=tk.tokenize)

    unprocessed_responses = []

    words_list = []
    for word in words_list_param:
        words_list.append(word)

    # Add words_list to unprocessed_ data
    for word in words_list:
        unprocessed_responses.append(word)

    responses = process_data(unprocessed_responses)

    processed_data = []
    for elem in responses:
        x = convert_text_numbers_to_numeric_numbers(elem)
        y = standardize_number(x)
        processed_data.append(y)

    matrix = count_vectorizer.fit_transform(processed_data)
    table = matrix.todense()
    df = pd.DataFrame(table, columns=count_vectorizer.get_feature_names_out())

    # Aplying the Cosine similarity module
    values = cosine_similarity(df, df)
    df = pd.DataFrame(values)

    # Applying the Euclidean Distance
    matrix2 = distance.cdist(df, df, 'euclidean')
    df_eucl = pd.DataFrame(matrix2)

    # Varying the number of clusters and to see what the optimum k is
    kmeans_kwargs = {
        "init": "random",
        "n_init": 10,
        "max_iter": 300,
    }

    # A list holds the SSE values for each k. Try for each k 1 - 10 and compare SSE values
    sse = []
    for k in range(1, len(df) - 1):
        kmeans = KMeans(n_clusters=k, **kmeans_kwargs)
        kmeans.fit(df)
        sse.append(kmeans.inertia_)

    # Calculate true k from the results
    kl = KneeLocator(range(1, len(df) - 1), sse,
                     curve="convex", direction="decreasing")
    true_k = len(df)
    if (kl.elbow != None):
        true_k = kl.elbow + 3

    # ACTUAL K means - COSINE
    kmeans = KMeans(init="random", n_clusters=true_k, n_init=10, max_iter=300)
    kmeans.fit(df)
    predict = kmeans.fit_predict(df)

    # Write COSINE results to file
    final_result = []
    for i in range(0, 10):
        cluster = []
        for x in range(len(responses)):
            if predict[x] == i:
                cluster.append(responses[x])
        if (len(cluster) != 0):
            final_result.append(cluster)

    return final_result


# main
# if __name__ == "__main__":
#     raw_responses = ['<(O)>/ \\<(O)>', '8.3x10^-4 V', '5/6 V', ':)', '.83V', '0.83v', '5/6', '0.83v', '5/12000',
#                      '8.333 V', '5/6 volt', '5/6 V', '4.16', '4.16 V', '10/12 Volts', '4.16', '10/12 v', '5/6 V ~ 0.833 V',
#                      '.83v', '5/12000A', '5/6 volts', '5/6 volts', '5 V']
#     print(cluster_list(raw_responses))
