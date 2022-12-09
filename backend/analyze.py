import sklearn
from word2number import w2n
import re
import nltk

# nltk.download('punkt')
# nltk.download('stopwords')

# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize

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
    for word in sentence.split():
        try:
            conversion = w2n.word_to_num(word)
            if (conversion != None):
                # loop through remaining words of the sentence 
                
                remaining = sentence[sentence.index(word) + len(word) + 1:]
                print(remaining)

                print(conversion)
        except:
            continue

            # sentence = sentence.replace(word, num2words(word))

def standardize_number(response):
    elems = re.split(r'(\d+)', response) 
    split_array = []
    
    count = 0
    while count < len(elems):
        elems[count] = elems[count].strip()
        if elems[count].isdigit():
            if (len(elems) - 2) <= count:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1
                
            elif elems[count+1] == '.' and elems[count+2].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1], elems[count+2]])), 3)
                split_array.append(str(rounded_num))
                count += 3
            elif elems[count+1] == '/' and elems[count+2].isdigit():
                rounded_num = round((float(elems[count])) / (float(elems[count+2])), 3)
                split_array.append(str(rounded_num))
                count += 3
            else:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1
        elif elems[count] == '.':
            if (len(elems) - 1) <= count:
                count += 1;
            elif elems[count+1].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1]])), 3)
                split_array.append(str(rounded_num))
                count += 2;
        else:
            get_string = re.sub('[^A-Za-z0-9]+', ' ', elems[count])
            if not get_string.isspace():
                split_array.append(get_string)
            count += 1

    return (' '.join(split_array)).strip()

# main
if __name__ == "__main__":
    # convert_text_numbers_to_numeric_numbers("I have five dogs, three cats, and seventy seven birds")
    responses = load_data("backend/test_responses.txt")
    # print(responses)
    print(standardize_number(" .74567asdkjf"))
    print(standardize_number("241.13457Volts"))
    print(standardize_number("241/77 Ohms"))
    print(standardize_number("11/8 Ohms"))
    print(standardize_number("241 Ohms"))
    print(standardize_number("2/5 Ohms"))


    
    # print(re.split(r'(\d+\.\d+)', "    1238.845 Volts") )
