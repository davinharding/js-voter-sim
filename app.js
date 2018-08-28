var faker = require('faker');

let voters = [],
    democratCandidates = [],
    republicanCandidates = [],
    independentCandidates = [];

class Person { 
    constructor(name) {
      this.name = name;
    }
}
class Voter extends Person {
    constructor(name, ideology) {
        super(name);
        this.ideology = ideology;
    }
}
class Candidate extends Person {
    constructor(name, party) {
        super(name);
        this.party = party;
        this.votes = 0;
    }
}

$('#voter-form form').submit(function(event) {
        event.preventDefault();
        let voterName = $('#voter-name').val();
        let voterIdeology = $('#voter-ideology').val();
        let voter = new Voter(voterName, voterIdeology);
        voters.push(voter);
        let li = $('<li></li>').text(`${voterName}, ${voterIdeology}`).addClass("list-group-item");
       $('#voter-list ul').append(li);
    }
)


$('#candidate-form form').submit(function(event) {
    event.preventDefault();
    let candidateName = $('#candidate-name').val();
    let candidateParty = $('#candidate-party').val();
    let candidate = new Candidate(candidateName, candidateParty);
    if(candidate.party === 'Democrat'){
        democratCandidates.push(candidate);
    }else if(candidate.party === 'Republican'){
        republicanCandidates.push(candidate);
    }else{
        independentCandidates.push(candidate);
    }
    let li = $('<li></li>').text(`${candidateName}, ${candidateParty}`).addClass("list-group-item");
   $('#candidate-list ul').append(li);
  });
    $('.btn.btn-danger').click(function(){
      vote(voters);
});

$('#randomize-btn').click(function(){
    event.preventDefault();
    while (voters.length < 100) {
        let ideology = ['Conservative', 'Liberal', 'Neutral'];
        let voterName = faker.name.findName();
        let voterIdeology = ideology[Math.floor(Math.random()*ideology.length)];
        let voter = new Voter(voterName, voterIdeology);
        voters.push(voter);
        let li = $('<li></li>').text(`${voterName}, ${voterIdeology}`).addClass("list-group-item");
        $('#voter-list ul').append(li);
    }
})

//Vote function selects a random candidate for the voter based on ideology as it relates to the outputs of partyVote and pickCandidate

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
    })
    pickWinner();
}

//partyVote function picks a party based on probability as it relates to voter ideaology

function partyVote(a,b){
    let num = Math.random();
    if (num<a) {
        return 'Democrat';
    } else if (num<b) {
        return 'Independent';
    }else{
        return 'Republican';
    }
}

//pickCandidate function picks a random candidate from the voter's corresponding candidate array and adds 1 to the votes count

function pickCandidate(party) {
    console.log(party);
    if (party === 'Democrat') {
        let index = Math.floor(Math.random()*democratCandidates.length)
        // console.log(index)
        let pick = democratCandidates[index];
        pick.votes ++;
        // console.log(pick);
    } else if (party === 'Republican') {
        let index = Math.floor(Math.random()*republicanCandidates.length)
        // console.log(index)
        let pick = republicanCandidates[index];
        pick.votes ++;
        // console.log(pick);
    } else {
        let index = Math.floor(Math.random()*independentCandidates.length)
        // console.log(index)
        let pick = independentCandidates[index];
        pick.votes ++;
        // console.log(pick);
    }
}

function pickWinner() {
    let demWinner = democratCandidates.reduce(function(acc, current) {
        if (acc.votes > current.votes) {
            return acc;
        } else {
            return current;
        }
    })
    let repWinner = republicanCandidates.reduce(function(acc, current) {
        if (acc.votes > current.votes) {
            return acc;
        } else {
            return current;
        }
    })
    let indWinner = independentCandidates.reduce(function(acc, current) {
        if (acc.votes > current.votes) {
            return acc;
        } else {
            return current;
        }
    })
    let winners = [demWinner, repWinner, indWinner];
    let finalWinner = winners.reduce(function(acc, current) {
        if (acc.votes > current.votes) {
            return acc;
        } else {
            return current;
        }
    })
    alert(finalWinner.name + " wins!")
}

