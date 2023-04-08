class API{

	// TODO - Migrate API to RESTful design

	static endpoint = "http://localhost:2000/game.php";
	static getOpts = {
		method: "GET",
		credentials: 'include',
		// mode: 'cors',
		crossDomain:false
	}

	static getBoard(callback){
		fetch(API.endpoint + "?a=gB", API.getOpts)
	    	.then(res => res.json())
	    	.then(res => callback(res))
	    	.catch(err => err);
	}

	static createBoard(options, callback){
		fetch(API.endpoint + "?a=gB&w=" + options.width + "&h=" + options.height + "&b=" + options.bombs, API.getOpts)
	    	.then(res => res.json())
	    	.then(res => callback(res))
	    	.catch(err => err);
	}

	static click(x, y, callback){
		fetch(API.endpoint + "?a=cl&x=" + x + "&y=" + y, API.getOpts)
			.then(res => res.json())
			.then(res => callback(res))
			.catch(err => err);
	}

	static flag(x, y, callback){
		fetch(API.endpoint + "?a=fl&x=" + x + "&y=" + y, API.getOpts)
			.then(res => res.json())
			.then(res => callback(res))
			.catch(err => err);
	}

};

export default API;