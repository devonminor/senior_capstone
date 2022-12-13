import sklearn
import pandas as pd
import numpy as np

import matplotlib
import matplotlib.pyplot as plt

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer 
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance
from sklearn.preprocessing import StandardScaler
from kneed import KneeLocator

from word2number import w2n
import re
from quantulum3 import parser
import nltk

# nltk.download('punkt')
# nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer

from sklearn.cluster import KMeans


# Steps for clustering student responses
# 
#   1. Load the data (create a file with a bunch of potential responses to a single question)
#   2. Process the data (check the spelling of each response, potentially remove stop words, remove punctuation, group like terms (ex. lbs, LBS, pounds), etc.)
#   3. Vectorize the data (convert the responses into a vector of numbers)
#   4. Cluster the data (use k-means to cluster the responses into groups)
#   5. Display the results (print out the clusters and the responses in each cluster)
#


# Load the data from file and return array of responses
def load_data(filename):
    responses = []
    with open(filename, 'r') as f:
        responses = f.read().splitlines()
    return responses

# Process the data and return array of processed responses
def process_data(responses):
    processed_responses = []
    for response in responses:
        processed_response = response.lower()
        processed_responses.append(processed_response)
    return processed_responses

# Convert all text numbers in a string to numeric numbers
def convert_text_numbers_to_numeric_numbers(sentence):
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

            # sentence = sentence.replace(word, num2words(word))


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
                rounded_num = round(float("".join([elems[count], elems[count+1], elems[count+2]])), 3)
                split_array.append(str(rounded_num))
                count += 3

            # checks if number is a fraction
            elif elems[count+1] == '/' and elems[count+2].isdigit():
                rounded_num = round((float(elems[count])) / (float(elems[count+2])), 3)
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
                count += 1;
            elif elems[count+1].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1]])), 3)
                split_array.append(str(rounded_num))
                count += 2;
        
        # if parsed string is not a number
        else:
            get_string = re.sub('[^A-Za-z0-9]+', " ", elems[count])
            if not get_string.isspace():
                split_array.append(get_string)
            count += 1

    return (" ".join(split_array)).strip()




# main
if __name__ == "__main__":
    # convert_text_numbers_to_numeric_numbers("I have five dogs, three cats, and seventy seven birds")
    responses = load_data("backend/sample1.txt")

    lowercase_responses = process_data(responses)
    fp = input_file = open("Clusters.txt", "w")


    final_arr = []
    for elem in lowercase_responses:
        x = convert_text_numbers_to_numeric_numbers(elem)
        y = standardize_number(x)
        final_arr.append(y)

    # cv = CountVectorizer(token_pattern=r"[^\s]+")
    # word_count = cv.fit_transform(final_arr)
    # print(word_count.shape)

    # tfidf_transformer=TfidfTransformer(smooth_idf=True,use_idf=True) 
    # tfidf_transformer.fit(word_count)

    # # print idf values 
    # df_idf = pd.DataFrame(tfidf_transformer.idf_, index=cv.get_feature_names_out(),columns=["idf_weights"]) 
    # # sort ascending 
    # df_idf.sort_values(by=['idf_weights'])
    # print(df_idf)



    # vectorizes data so machine can sort better
    vectorizer = TfidfVectorizer(stop_words='english', token_pattern=r"[^\s]+")
    test_vector = vectorizer.fit_transform(final_arr)


    table = test_vector.todense()
    df = pd.DataFrame(table, columns=vectorizer.get_feature_names_out())

    # Varying the number of clusters and to see what the optimum k is
    kmeans_kwargs = {
    "init": "random",
    "n_init": 10,
    "max_iter": 300,
    }

    # obtain optimum k
    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters = k, **kmeans_kwargs)
        kmeans.fit(df)
        sse.append(kmeans.inertia_)

    kl = KneeLocator(range(1, 11), sse, curve="convex", direction="decreasing")
    print("True K: " + str(kl.elbow + 1))
    true_k = kl.elbow + 1



    # testing euclidian distance function
    values = distance.cdist(df, df, 'euclidean')
    df_eucl = pd.DataFrame(values)


    kmeans = KMeans(init="random", n_clusters=true_k, n_init=15, max_iter=300)
    kmeans.fit(df_eucl)
    predict = kmeans.fit_predict(df_eucl)

    fp.write("\n")
    fp.write("Results Using Eucl Function \n")
    for i in range(0, 10):
        fp.write("Cluster: " + str(i) + " --> ")
        for x in range(len(final_arr)):
            if predict[x] == i: 
                fp.write(final_arr[x])
                fp.write(" | ")
        fp.write("\n")

    

    # testing euclidian distance function
    values = cosine_similarity(df, df)
    df_cos = pd.DataFrame(values)
    kmeans = KMeans(init="random", n_clusters=true_k, n_init=15, max_iter=300)
    kmeans.fit(df_cos)
    predict = kmeans.fit_predict(df_cos)

    fp.write("Results Using Cosine Function \n")
    for i in range(0, 10):
        fp.write("Cluster: " + str(i) + " --> ")
        for x in range(len(final_arr)):
            if predict[x] == i: 
                fp.write(final_arr[x])
                fp.write(" | ")
        fp.write("\n")
    fp.close()

    # Sum_of_squared_distances = []
    # K = range(2,10)
    # for k in K:
    #     km = KMeans(n_clusters=k, max_iter=200, n_init=10)
    #     km = km.fit(test_vector)
    #     Sum_of_squared_distances.append(km.inertia_)
    # plt.plot(K, Sum_of_squared_distances, 'bx-')
    # plt.xlabel('k')
    # plt.ylabel('Sum_of_squared_distances')
    # plt.title('Elbow Method For Optimal k')
    # plt.show()





    # true_k = 8
    # model = KMeans(n_clusters=true_k, init='k-means++', max_iter=200, n_init=15)
    # model.fit(test_vector)
    # labels=model.labels_
    # results=pd.DataFrame(list(zip(final_arr,labels)),columns=['title','cluster'])
    # print(results.sort_values(by=['cluster']))







    # print(test_vector)

    # model = KMeans(n_clusters = 5)
    # model.fit(test_vector)

    # print("Top terms per cluster:")
    # order_centroids = model.cluster_centers_.argsort()[:, ::-1]
    # terms = vectorizer.get_feature_names()
    # for i in range(2):
    #     print("Cluster %d:" % i),
    #     for ind in order_centroids[i, :10]:
    #         print(' %s' % terms[ind]),
    #     print



    # print(test_vector)
    # cluster_map = pd.DataFrame()
    # cluster_map['cluster'] = km.labels_
    
    # print(cluster_map[cluster_map.cluster == 3])

