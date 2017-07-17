var ClozeQuestion = function (full, cloze) {
	// Convert the incoming strings to lower case
	var fullToLower = full.toLowerCase();
	var clozeToLower = cloze.toLowerCase();

	// Confirm that the cloze statement appears within the complete text
	if (!fullToLower.includes(clozeToLower)) {
		console.log('ERROR: cloze-deletion does not appear within full text -- <' + cloze + '>');
		return;
	}

	this.full = full;
	this.cloze = cloze;
	this.partial = full.replace(cloze, '...');
} 

module.exports = ClozeQuestion;