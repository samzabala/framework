// //lazyload
frameWork.loadImage = (img) => {
	let imgSrc = img.getAttribute('data-src'),
	imgSrcset = img.getAttribute('data-srcset');

if (img.matches('img') || img.closest('picture')) {
	if (__f.strGetFileExtension(imgSrc) == 'svg') {
		const imgID = img.getAttribute('id') || null;
		const imgClass = img.getAttribute('class') || null;

		fetch(imgSrc)
			.then((response) => response.text())
			.then((markup) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(markup, 'text/html');

				const svg = doc.querySelector('svg');

				if (svg) {
					if (typeof imgID !== null) {
						svg.setAttribute('id', imgID);
					}
					if (typeof imgClass !== null) {
						svg.setAttribute(
							'class',
							`${imgClass} replaced-svg`
						);
					}

					svg.removeAttribute('xmlns:a');
					img.replaceWith(svg);
				}
			});
	} else {
		img.hasAttribute('data-src') && img.setAttribute('src', imgSrc);
		img.hasAttribute('data-srcset') && img.setAttribute('srcset', imgSrcset);
	}
} else {
	img.style.backgroundImage = `url(${imgSrc})`;
}
img.classList.add('lazy-loaded');
};

frameWork.loadImages = (images) => {

document.documentElement.
	classList.remove('lazy-completed');
document.documentElement.
	classList.add('lazy-in-progress');
//css images
// images
images = images || document.querySelectorAll('*[data-src]');

images.forEach((img) => {
	frameWork.loadImage(img);
});

document.documentElement.
	classList.remove('lazy-in-progress');
document.documentElement.
	classList.add('lazy-completed');
};

frameWork.settings.lazyLoad && __f.fns_on_ready.push(frameWork.loadImages);