function MarvelController() {
    var marvelService = new MarvelService()

    //Private
    var myTeamElem = document.getElementById("my-team")
    
    function getCharacters() {
        marvelService.getCharacters(drawMarvel)
    }

    function drawMarvel(arr) {
        var template = ''
        var marvelElem = document.getElementById("marvel-characters")
        for (var i = 0; i < arr.length; i++) {
            var char = arr[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            template += `
            <div class="col-sm-4">
                <div class="card card-format">
                    <img class="card-img-top" src="${char.thumbnail.path + '.' + char.thumbnail.extension}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><b>Name:</b> ${char.name}</h5>
                        <p class="card-text"><b>Description:</b> ${char.description}</p>
                        <p class="card-text"><b>Comic Appearances:</b> ${char.comics.available}</p>
                        <button class="btn-primary" onclick="app.controllers.marvelCtrl.addToTeam(${char.id})">Add to team</button>
                    </div>
                </div>
		    </div>
            `
        }
        marvelElem.innerHTML = template
    }

    function drawMyTeam(cb) {
        var template = ''
        var arr = cb()
        for (let i = 0; i < arr.length; i++) {
            const char = arr[i];
            template += `
            <div class="col-sm-4">
                <div class="card">
                    <img class="card-img-top" src="${char.thumbnail.path + '.' + char.thumbnail.extension}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><b>Name:</b> ${char.name}</h5>
                        <p class="card-text"><b>Description:</b> ${char.description}</p>
                        <p class="card-text"><b>Comic Appearances:</b> ${char.comics.available}</p>
                        <button class="btn-primary" onclick="app.controllers.marvelCtrl.removeFromTeam(${char.id})">Remove from team</button>
                    </div>
                </div>
		    </div>
            `
        }
        myTeamElem.innerHTML = template
    }

    function getMyTeam() {
        return marvelService.getMyTeam()
    }


    //Public

    this.addToTeam = function addToTeam(id) {
        marvelService.addToTeam(id)
        drawMyTeam(getMyTeam)
    }

    this.removeFromTeam = function removeFromTeam(id) {
        marvelService.removeFromTeam(id)
        drawMyTeam(getMyTeam)
    }

    this.resetMyTeam = function resetMyTeam(val) {
        confirm("Are you sure you would like to clear your team?") ? (marvelService.resetMyTeam(val), drawMyTeam(getMyTeam)) : false
    }




    getCharacters()
}