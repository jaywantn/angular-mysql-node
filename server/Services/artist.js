let async = require('async'),
parseString = require('xml2js').parseString;
 
let util = require('../Utilities/util'),
artistDAO = require('../DAO/artistDAO');
//config = require("../Utilities/config").config;
 
 
/**API to create the atricle */
let createArtist = (data, callback) => {
	async.auto({
		article: (cb) => {
			var dataToSet = {
				"category_name":data.category_name?data.category_name:'',
			}
			console.log(dataToSet);
			artistDAO.createArtist(dataToSet, (err, dbData) => {
			if (err) {
					cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
				return;
			}
		 
			cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_INSERTED,"result":dataToSet });
		});
	}
	//]
	}, (err, response) => {
		callback(response.article);
	});
}
 
/**API to update the article */
let updateArtist = (data,callback) => {
		async.auto({
		articleUpdate :(cb) =>{
			if (!data.id) {
				cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
			return;
			}
			console.log('phase 1');
			var criteria = {
				id : data.id,
			}
		var dataToSet={
			"category_name": data.category_name,
		}
		console.log(criteria,'test',dataToSet);
		artistDAO.updateArtist(criteria, dataToSet, (err, dbData)=>{
			if(err){
				cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
			return; 
			}
			else{
				cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });                        
			}
		});
		}
		}, (err,response) => {
			callback(response.articleUpdate);
		});
}
 
/**API to delete the subject */
let deleteArtist = (data,callback) => {
	console.log(data,'data to set')
	async.auto({
		removeArticle :(cb) =>{
		if (!data.id) {
			cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
		return;
		}
		var criteria = {
			id : data.id,
		}
		artistDAO.deleteArtist(criteria,(err,dbData) => {
		if (err) {
			console.log(err);
			cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
			return;
		}
			cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
		});
	}
	}, (err,response) => {
		callback(response.removeArticle);
	});
}
 
/***API to get the article list */
let getArtist = (data, callback) => {
	async.auto({
		article: (cb) => {
			artistDAO.getArtist({},(err, data) => {
			if (err) {
				cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
				return;
			}
				cb(null, data);
				return;
			});
		}
		}, (err, response) => {
	callback(response.article);
	})
}
 
/***API to get the article detail by id */
let getArtistById = (data, callback) => {
		async.auto({
			article: (cb) => {
				let criteria = {
					"id":data.id
				}
				artistDAO.getArtistDetail(criteria,(err, data) => {
	
	if (err) {
					console.log(err,'error----');
					cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
				return;
				}
				cb(null, data[0]);
				return;
				});
			}
		}, (err, response) => {
		callback(response.article);
		})
}
 
module.exports = {
createArtist : createArtist,
updateArtist : updateArtist,
deleteArtist : deleteArtist,
getArtist : getArtist,
getArtistById : getArtistById
};