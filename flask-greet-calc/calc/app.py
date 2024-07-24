# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

@app.route("/add")
def addnums():
    nums = []
    for num in request.args.values():
        nums.append(int(num))

    result = operations.add(nums[0], nums[1])

    return str(result)

@app.route("/sub")
def subnums():
    nums = []
    for num in request.args.values():
        nums.append(int(num))

    result = operations.sub(nums[0], nums[1])

    return str(result)

@app.route("/mult")
def multnums():
    nums = []
    for num in request.args.values():
        nums.append(int(num))

    result = operations.mult(nums[0], nums[1])

    return str(result)

@app.route("/div")
def divnums():
    nums = []
    for num in request.args.values():
        nums.append(int(num))

    result = operations.div(nums[0], nums[1])

    return str(result)

@app.route("/math/<op>")
def math(op):

    nums = []

    for num in request.args.values():
        nums.append(int(num))

    funcs = {"add" : operations.add,
             "sub" : operations.sub,
             "mult" : operations.mult,
             "div" : operations.div}
    
    result = funcs.get(op)(nums[0], nums[1])

    return str(result)