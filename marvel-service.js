function MarvelService() {
    var key = '?apikey=3679da333ac8b8524c3a429ba883d70a';
    var baseUrl = 'http://gateway.marvel.com/v1/public/'

    var marvelCharacters = []
    var myTeam = []

    function getCharacterById(arr, id){
        for (let i = 0; i < arr.length; i++) {
            const char = arr[i];
            if (id == char.id){
                return char
            }
        }
    }


    this.getMyTeam = function getMyTeam() {
        return myTeam
    }

    this.resetMyTeam = function resetMyTeam(val) {
        myTeam = val
    }

    this.removeFromTeam = function removeFromTeam(id){
        var charRemove = getCharacterById(myTeam, id)
        charRemove ? myTeam.splice(myTeam.indexOf(charRemove), 1) : false
    }

    this.addToTeam = function addToTeam(id) {
        if (myTeam.length >= 5) { alert("Hero limit for team reached!"); return }
        var char = getCharacterById(marvelCharacters, id) 
        char && !getCharacterById(myTeam, id) ? myTeam.unshift(char) : false
    }


    this.getCharacters = function getCharacters(callWhenDone) {
        var data = localStorage.getItem('MarvelData')
        if (data) {
            marvelCharacters = JSON.parse(data);
            return callWhenDone(marvelCharacters)
        }
        $.get(baseUrl + 'characters' + key, function (response) {
            localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
            marvelCharacters = response.data.results;
            callWhenDone(marvelCharacters)
        })
    }

}