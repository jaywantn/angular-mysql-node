let dbConfig = require("../Utilities/mysqlConfig");
 
let getArtist = (criteria, callback) => {
//criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
	dbConfig.getDB().query(`select * from artist_category where 1`,criteria, callback);
}
 
let getArtistDetail = (criteria, callback) => {
    let conditions = "";
	criteria.id ? conditions += ` and cat_id = '${criteria.id}'` : true;
	dbConfig.getDB().query(`select * from artist_category where 1 ${conditions}`, callback);
}
 
let createArtist = (dataToSet, callback) => {
	console.log("insert into artist_category set ? ", dataToSet,'jaywant')
	dbConfig.getDB().query("insert into artist_category set ? ", dataToSet, callback);
}
 
let deleteArtist = (criteria, callback) => {
	let conditions = "";
	criteria.id ? conditions += ` and cat_id = '${criteria.id}'` : true;
	console.log(`delete from artist_category where 1 ${conditions}`);
	dbConfig.getDB().query(`delete from artist_category where 1 ${conditions}`, callback);
 
}
 
let updateArtist = (criteria,dataToSet,callback) => {
    let conditions = "";
	let setData = "";
	criteria.id ? conditions += ` and cat_id = '${criteria.id}'` : true;
	dataToSet.category_name ? setData += `category_name = '${dataToSet.category_name}'` : true;
	//dataToSet.title ? setData += `, title = '${dataToSet.title}'` : true;
	console.log(setData)
	console.log(`UPDATE artist_category SET ${setData} where 1 ${conditions}`);
	dbConfig.getDB().query(`UPDATE artist_category SET ${setData} where 1 ${conditions}`, callback);
}
module.exports = {
	getArtist : getArtist,
	createArtist : createArtist,
	deleteArtist : deleteArtist,
	updateArtist : updateArtist,
	getArtistDetail : getArtistDetail
}