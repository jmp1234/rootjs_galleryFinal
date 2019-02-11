/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];




function initiateApp(){

	if(localStorage.pictures!==undefined){
		//set pictures to the localstorage pictures
		pictures = localStorage.pictures;
	}
	var retrievedData = localStorage.getItem('pictures');
	pictures = JSON.parse(retrievedData);

	makeGallery(pictures);
	addModalCloseHandler();

	/*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
	*/

	$('#gallery').sortable({
		update: function() {
			var updatedPictures = [];
			var figurePictures = $("figure.imageGallery");
			for(var i=0; i<figurePictures.length; i++) {
				//var url = $('figure.imageGallery:nth-child(' + i + ')').css('background-image').replace('url(', '').replace('\")', '');
				var url = $(figurePictures[i]).css('background-image').replace('url(', '').replace('\")', '');

				var new_picture =  url.slice(url.lastIndexOf('images'));

				updatedPictures.push(new_picture);

			}
			console.log(updatedPictures);
			localStorage.pictures =  JSON.stringify(updatedPictures)
		}
	})
}

function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section
	//create a loop to go through the pictures
		//create the elements needed for each picture, store the elements in variable
		for(var i = 0; i< pictures.length; i++) {
			var image = pictures[i];
			var figCaption = $('<figcaption>').text(image);
			var figure = $('<figure>', {
				'class': 'imageGallery col-xs-12 col-sm-6 col-md-4',
				css: {
					'background-image': `url(${image})`,
				},
				on: {
					click: displayImage
				}
			});
				/*}).css('background-image', 'url(' + image + ')');
			var figure = $('<figure>', {
				class: 'imageGallery col-xs-12 col-sm-6 col-md-4,'

			})*/

			//figure.click(displayImage);

			figure.append(figCaption);
			$('#gallery').append(figure);

		}
		//attach a click handler to the figure you create.  call the "displayImage" function.

		//append the element to the #gallery section


}


function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
	$('.modal-body > img').click(function() {
		$('.modal').modal('hide');
	})
}

function displayImage(){
	var rawUrl = $(this).css('background-image');

	var url = rawUrl.replace('url(\"', '').replace('\")', '');

/*
	debugger;
	var test = /url\("([a-z:\/A-Z_\-0-9.]*)"\)/gm;
	console.log(rawUrl.match(test))
*/

	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need
	var titleBeginning = url.lastIndexOf('/') + 1;
	var titleEnding = url.lastIndexOf('.');
	var title = url.slice(titleBeginning, titleEnding);

	var imageBeginning = url.lastIndexOf('images');
	var imageSrc = url.slice(imageBeginning);

	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method

	//change the modal-title text to the name you found above
	//change the src of the image in the modal to the url of the image that was clicked on
	$('.modal-title').text(title);
	$('.modal-body > img').attr('src', imageSrc);
	//show the modal with JS.  Check for more info here:
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}
