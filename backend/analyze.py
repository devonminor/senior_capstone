import sklearn
from word2number import w2n

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

# main
if __name__ == "__main__":
    convert_text_numbers_to_numeric_numbers("I have five dogs, three cats, and seventy seven birds")
    # responses = load_data("responses.txt")
    # print(responses)

    
