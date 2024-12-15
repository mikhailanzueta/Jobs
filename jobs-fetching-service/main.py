from bs4 import BeautifulSoup
import yaml
import glob
import os
from pprint import pp
#print('Hello world')
class ParsedData:
    pass

# Ticket #1 - return yaml configs from file as a python dictionary

def read_yaml_from_file(file_name: str) -> dict:
    with open(file_name, 'r') as read_file:
        configs = yaml.safe_load(read_file)
    return configs
file_name = 'siteConfigs/LinkedIn.yaml'
contents = read_yaml_from_file(file_name)
print(contents)

# Ticket #3 - return html from fetched site as a data structure
def fetch_html_from_site(url: str, endpoint: str, query: str) -> BeautifulSoup:
    pass

# Ticket #4 - return the parsed data from the html
def parse_data_from_html(hmtl, configs: dict) -> ParsedData:
    pass

# Ticket #5 - load the data into the DB
def load_data_into_db(data: ParsedData)-> None:
    pass

def read_all_yaml_files(folder_path):
    # Check if siteConfigs is a directory
    if not os.path.isdir(folder_path):
        print(f"Error: {folder_path} is not a valid directory")
        return
    else:
        print(f"{folder_path} is a valid directory")
    
    # Search inside of the folder_path and look for files ending in .yaml
    yaml_files = glob.glob(os.path.join(folder_path, "*.yaml"))
    # Where file configs will be stored
    all_configs = []
    for yaml_file in yaml_files:
        try:
            # Call function 1 on every yaml file
            config = read_yaml_from_file(yaml_file)
            # Add yaml file configs along with the file names to all_configs
            all_configs.append({os.path.basename(yaml_file): config})
        except:
            pprint(f"Error reading {yaml_file}")
    return all_configs
    

folder_path = "siteConfigs"
all_configs = read_all_yaml_files(folder_path) 
pp(all_configs)
   