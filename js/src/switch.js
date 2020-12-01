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
		const switchWrapper = __f.getTheToggled(triggerer, 'switch');
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