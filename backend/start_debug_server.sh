# The script is used to start the debug server
# Remove --reload if you don't want to reload the server when the code changes
uvicorn main:app --reload --port 5002