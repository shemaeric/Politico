let menu = document.getElementById('menu'),
			aside = document.getElementById('aside'),
			state = document.getElementById('info-1'),
			local = document.getElementById('info-2'),
			legislative = document.getElementById('info-3'),
			gov = document.getElementById('info-4'),
			stateBox = document.getElementById('box-1'),
			localBox = document.getElementById('box-2'),
			legBox = document.getElementById('box-3'),
			govBox = document.getElementById('box-4');
		menu.addEventListener('click', function () {
			aside.className = 'side';
		});
		state.addEventListener('click', function() {
			localBox.style.display = 'none';
			legBox.style.display = 'none';
			govBox.style.display = 'none';
			stateBox.style.display = 'block';
		});
		local.addEventListener('click', function() {
			stateBox.style.display = 'none';
			legBox.style.display = 'none';
			govBox.style.display = 'none';
			localBox.style.display = 'block';
		});
		legislative.addEventListener('click', function() {
			localBox.style.display = 'none';
			stateBox.style.display = 'none';
			govBox.style.display = 'none';
			legBox.style.display = 'block';
		});
		gov.addEventListener('click', function() {
			localBox.style.display = 'none';
			stateBox.style.display = 'none';
			legBox.style.display = 'none';
			govBox.style.display = 'block';
		});