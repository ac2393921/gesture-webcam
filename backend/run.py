from flask import Flask

app = Flask(__name__)

from api import pose
app.register_blueprint(pose)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)