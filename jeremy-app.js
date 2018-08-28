let voters = [{name: "Jeremy", ideology: "Liberal"}];
let democratCandidates = [{name: "Jon", party: "Democrat", votes: 0}];
let republicanCandidates = [{name: "Jon", party: "Republican", votes: 0}];
let independentCandidates = [{name: "Jon", party: "Independent", votes: 0}];

class Person {
    constructor(name) {
        this.name = name;
    }
};

class Voter extends Person {
    constructor(name, ideology) {
    super(name)
    this.ideology = ideology;
    }
}

class Candidate extends Person {
    constructor(name, party) {
    super(name)
    this.party = party;
    this.votes = 0;
    }
}

// let a = new Candidate("Jeremy", "party")
// console.log(a)
// a.votes = 1
// console.log

$(document).ready(function() {
    $("#voter-form form").submit(function(event){
        event.preventDefault();
        let name = $('#voter-name').val();
        let ideology = $('#voter-ideology').val();
        let newVoter = new Voter(name, ideology);
        voters.push(newVoter);
        console.log(voters);
        let li = $('<li></li>').text(`${name}, ${ideology}`).addClass( "list-group-item" );
        $('#voter-list ul').append(li);
    });
    $("#candidate-form form").submit(function(event){
        event.preventDefault();
        let name = $('#candidate-name').val();
        let party = $('#candidate-party').val();
        let newCandidate = new Candidate(name, party);
        if(newCandidate.party === 'Democrat') {
            democratCandidates.push(newCandidate);
        } else if (newCandidate.party === 'Independant') {
            independantCandidates.push(newCandidate);
        } else {republicanCandidates.push(newCandidate)};
        console.log(democratCandidates, independentCandidates, republicanCandidates);
        let li = $('<li></li>').text(`${name}, ${party}`).addClass( "list-group-item" );
        $('#candidate-list ul').append(li);
    });
    $('.btn.btn-danger').click(function(){   //NEED TO FIX THIS!!!
        vote(voters);
    });
});

function vote(voters){
    voters.forEach(function(v){
        if(v.ideology === "Liberal"){
            // console.log(partyVote(.6,.8));
            return pickCandidate(partyVote(.6,.8));
        } else if (v.ideology === "Neutral") {
            // console.log(partyVote(.5,.75))
            return pickCandidate(partyVote(.5,.75));
        } else {
            // console.log(partyVote(.2,.4))
            return pickCandidate(partyVote(.2,.4));
        }
    });
}
function partyVote(a,b){
    let randomNumber = Math.random();
    if (randomNumber < a){
        return 'Democrat'
    }        
    else if (randomNumber < b) {
        return 'Independant'
    }        
    else {return 'Republican'}
        
}

function pickCandidate (party) {
    console.log(party)
    if (party === 'Democrat') {
        // console.log('test democrat')
        let pick = democratCandidates[Math.floor(Math.random()*democratCandidates.length)];
        pick.votes ++;
        console.log(pick)
    } else if (party === 'Republican') {
        // console.log('test republican')
        let pick = republicanCandidates[Math.floor(Math.random()*republicanCandidates.length)];
        pick.votes ++;
        console.log(pick);
    } else {
        // console.log('test indy')
        let pick = independentCandidates[Math.floor(Math.random()*independentCandidates.length)];
        pick.votes ++;
        console.log(pick);
    }
}
