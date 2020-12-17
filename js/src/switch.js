frameWork.initSwitch = (triggerer,mode) => {
	triggerer = triggerer || false;
	mode = mode || ''; //on,off,toggle or init probably

	const toggleSwitchBlock = (switchWrapper) => {
		if(switchWrapper.classList.contains('switch-to-off')){
			switchWrapper.classList.remove('switch-to-off');
			switchWrapper.classList.add('switch-to-on');
		}else{
			switchWrapper.classList.remove('switch-to-on');
			switchWrapper.classList.add('switch-to-off');
		}
	}
	
	if(triggerer){
		const switchWrapper = UiToggled( 'switch',triggerer);
		if(switchWrapper){
			switch(mode){
				case 'on':
					switchWrapper.classList.remove('switch-to-off')
					switchWrapper.classList.add('switch-to-on');
					break;
				case 'off':
					switchWrapper.classList.remove('switch-to-on')
					switchWrapper.classList.add('switch-to-off');
					break;
				default:
					toggleSwitchBlock(switchWrapper);
					break;
			}
		}
	}else{
		if(mode == 'off'){
			document.querySelectorAll('.switch:not(.switch-idle)').forEach((switchWrapper) =>{
				switchWrapper.classList.remove('switch-to-on')
				switchWrapper.classList.add('switch-to-off');
			});
		}else{

			document.querySelectorAll('.switch:not(.switch-to-on)').forEach((switchWrapper) =>{
				switchWrapper.classList.add('switch-to-off');
			});
		}
	} 
}
__f.fns_on_rightAway.push(frameWork.initSwitch);

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="switch-off"]',
	(e) => {
		const triggerer = e.target;

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.initSwitch(triggerer,'off')
		}else{
			e.preventDefault();
		}
	}
);

FwEvent.addListener(
	document.documentElement,
	'click',
	'*[data-toggle="switch-on"]',
	(e) => {
		const triggerer = e.target;

		if (!frameWork.isDisabled(triggerer)) {
			frameWork.initSwitch(triggerer,'on')
		}else{
			e.preventDefault();
		}
	}
);
