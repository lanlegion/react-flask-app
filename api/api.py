import time

import yaml
from flask import Flask, request

import elliot_basic

data = ''

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/elliot')
def get_rec_analysis():
    elliot_basic.run_basic()
    data = elliot_basic.read_recs()
    return data

@app.route('/result')
def get_rec_result():
    return {'result': data if data else elliot_basic.read_recs() }#"RESULT HERE"}

@app.route("/config", methods=["POST"], strict_slashes=False)
def set_config():
    config = request.json
    with open(r'config_files/test.yml', 'w') as file:
        output = yaml.dump(config, file)
        print(output)
    return 'OK'
