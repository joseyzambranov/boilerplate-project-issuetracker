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

        })

   
    })

});
