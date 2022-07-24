const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
require("../bd-connection");

chai.use(chaiHttp);

let deleteId;

/*Create an issue with every field: POST request to /api/issues/{project}
Create an issue with only required fields: POST request to /api/issues/{project}
Create an issue with missing required fields: POST request to /api/issues/{project}

View issues on a project: GET request to /api/issues/{project}
View issues on a project with one filter: GET request to /api/issues/{project}
View issues on a project with multiple filters: GET request to /api/issues/{project}

Update one field on an issue: PUT request to /api/issues/{project}
Update multiple fields on an issue: PUT request to /api/issues/{project}
Update an issue with missing _id: PUT request to /api/issues/{project}
Update an issue with no fields to update: PUT request to /api/issues/{project}
Update an issue with an invalid _id: PUT request to /api/issues/{project}

Delete an issue: DELETE request to /api/issues/{project}
Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
Delete an issue with missing _id: DELETE request to /api/issues/{project} */

suite('Functional Tests', function() {

    suite("Routing Tests",function(){
        //POST REQUIRED TEST
        suite("3 Post request tests",function(){

            test("Create an issue with every field: POST request to /api/issues/{project}",function(done){
                chai.request(server)
                    .post("/api/issues/projects")
                    .set("content-type","application/json")
                    .send({
                        issue_title:"Issue",
                        issue_text:"Function Test",
                        created_by:"fcc",
                        assigned_to:"Dom",
                        status_text:"Not Done",
                    })
                    .end(function(err,res){
                        assert.equal(res.status,200);
                        deleteId = res.body._id;
                        assert.equal(res.body.issue_title,"Issue");
                        assert.equal(res.body.issue_text,"Function Test");
                        assert.equal(res.body.created_by,"fcc");
                        assert.equal(res.body.assigned_to,"Dom");
                        assert.equal(res.body.status_text,"Not Done")
                        done();
                    })
            })
            test("Create an issue with only required fields: POST request to /api/issues/{project}",function(done){
                chai.request(server)
                    .post("/api/issues/projects")
                    .set("content-type","application/json")
                    .send({
                        issue_title:"Issue",
                        issue_text:"Function Test",
                        created_by:"fcc",
                        assigned_to:"",
                        status_text:"",
                    })
                    .end(function(err,res){
                        assert.equal(res.status,200);
                        deleteId = res.body._id;
                        assert.equal(res.body.issue_title,"Issue");
                        assert.equal(res.body.issue_text,"Function Test");
                        assert.equal(res.body.created_by,"fcc");
                        assert.equal(res.body.assigned_to,"");
                        assert.equal(res.body.status_text,"")
                        done();
                    })
            })
            test("Create an issue with missing required fields: POST request to /api/issues/{project}",function(done){
                chai.request(server)
                    .post("/api/issues/projects")
                    .set("content-type","application/json")
                    .send({
                        issue_title:"",
                        issue_text:"",
                        created_by:"fcc",
                        assigned_to:"",
                        status_text:"",
                    })
                    .end(function(err,res){
                        assert.equal(res.status,200);
                        assert.equal(res.body.error,"required field(s) missing")
                        done();
                    })
            })

        })
        //GET REQUIRED TEST
         suite("3 get request tests",function(){
            test("View issues on a project: GET request to /api/issues/{project}",function(done){
                chai.request(server)
                .get("/api/issues/apitest")
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.length,4)
                    done();
                })

            })
            test("View issues on a project with one filter: GET request to /api/issues/{project}",function(done){
                chai.request(server)
                .get("/api/issues/apitest")
                .query(
                    {_id:"62d9b699f8ca85d384bfc078"}
                )
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.deepEqual(res.body[0],{
                        issue_title: "prueb",
                        issue_text: "789",
                        created_on: "2022-07-21T20:27:05.702Z",
                        updated_on: "2022-07-21T20:27:05.702Z",
                        created_by: "789",
                        assigned_to: "joe",
                        open: true,
                        status_text: "",
                        _id: "62d9b699f8ca85d384bfc078"
                    })
                    done();
                })
            })
            test("View issues on a project with multiple filters: GET request to /api/issues/{project}",function(done){
                chai.request(server)
                .get("/api/issues/apitest")
                .query(
                    {open: true,
                    issue_text: "gegeeg",}
                )
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.deepEqual(res.body[0],{
                        "issue_title": "gegegeg",
                        "issue_text": "gegeeg",
                        "created_on": "2022-07-21T02:54:11.649Z",
                        "updated_on": "2022-07-21T02:54:11.649Z",
                        "created_by": "qwqwqwqw",
                        "assigned_to": "",
                        "open": true,
                        "status_text": "",
                        "_id": "62d8bfd391f65723aa6509ef"
                    })
                    done();
                })
            })
        })
        //PUT REQUIRED TEST
        suite("5 put request tests", function(){
            test("Update one field on an issue: PUT request to /api/issues/{project}",function(done){
                chai.request(server)
                .put("/api/issues/apitest")
                .send(
                    {_id: "62d8beb41193325fbf190e51",
                    issue_text: "modified",}
                )
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.result,"successfully updated")
                    assert.equal(res.body._id,"62d8beb41193325fbf190e51")
                    done();
                })
            })
            test("Update multiple fields on an issue: PUT request to /api/issues/{project}",function(done){
                chai.request(server)
                .put("/api/issues/apitest")
                .send(
                    {_id: "62d8beb41193325fbf190e51",
                    issue_text: "modified",
                    issue_title: "modified",}
                )
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.result,"successfully updated")
                    assert.equal(res.body._id,"62d8beb41193325fbf190e51")
                    done();
                })
            })
            test("Update an issue with missing _id: PUT request to /api/issues/{project}",function(done){
                chai.request(server)
                .put("/api/issues/apitest")
                .send(
                    {
                    issue_text: "modified",
                    issue_title: "modified",}
                )
                .end(function(err,res){
                    assert.equal(res.status,200);
                    assert.equal(res.body.error,"missing _id")
                    done();
                })
            })
            
        })

   
    })

});
