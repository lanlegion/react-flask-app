import pandas as pd
import glob

from elliot.run import run_experiment

def run_basic(filename):
    print("We are now starting the Elliot's experiment")
    #run_experiment("config_files/basic_configuration.yml")

    run_experiment("config_files/"+filename)

def read_recs():
    # specifying the path to csv files
    path = "results/movielens_1m/recs"

    # csv files in the path
    files = glob.glob(path + "/*.tsv")

    csv_data = pd.read_csv(files[0])

    row_count = csv_data.shape[0]
    column_count = csv_data.shape[1]
    column_names = csv_data.columns.tolist()

    # credit https://dzone.com/articles/full-stack-development-tutorial-sending-pandas-dat
    # Option [1]
    json = csv_data.to_json(orient='records')
    print(json)
    return json