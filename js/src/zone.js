
		frameWork.addEvent(
			document.documentElement,
			'change',
			'.zone input[type="file"]',
			(e) => {
				const triggerer = e.target;
				const zone = triggerer.closest('.zone');
				const files = triggerer.files;

				const zoneDyText = zone.querySelector('.zone-has-content-text');
				zoneDyText && zoneDyText.parentNode.removeChild(zoneDyText);

				if (triggerer.value && files.length) {
					zone.classList.add('zone-has-content');

					zone.innerHTML += `<div class="zone-has-content-text">
							<span>${files.length} files selected.<br> Click or drag and drop to reselect</span>
						</div>`;

				} else {
					zone.classList.remove('zone-has-content');
				}
			}
		);