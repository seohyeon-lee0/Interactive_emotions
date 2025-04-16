window.addEventListener("DOMContentLoaded", () => {
	updateEyeWrappers();
	setupEyeballMotion();
});
window.addEventListener("resize", updateEyeWrappers);

function updateEyeWrappers() {
	const combined = document.querySelector(".combined-image");
	const baseWidth = 1298;
	const baseHeight = 1344;

	const eyes = [
		// 눈 2개 (eye-group-1)
		{ el: document.querySelectorAll(".eye-wrapper")[0], x: 190, y: 658 + 436, eyeSize: 142, eyeballSize: 87 },
		{ el: document.querySelectorAll(".eye-wrapper")[1], x: 689, y: 658 + 436, eyeSize: 142, eyeballSize: 87 },
		// 눈 4개 (eye-group-2)
		{ el: document.querySelectorAll(".eye-wrapper")[2], x: 943, y: 183 + 436, eyeSize: 44, eyeballSize: 20 },
		{ el: document.querySelectorAll(".eye-wrapper")[3], x: 1140, y: 148 + 436, eyeSize: 44, eyeballSize: 20 },
		{ el: document.querySelectorAll(".eye-wrapper")[4], x: 943, y: 392 + 436, eyeSize: 44, eyeballSize: 20 },
		{ el: document.querySelectorAll(".eye-wrapper")[5], x: 1138, y: 358 + 436, eyeSize: 44, eyeballSize: 20 }
	];

	const scaleX = combined.clientWidth / baseWidth;
	const scaleY = combined.clientHeight / baseHeight;

	eyes.forEach(({ el, x, y, eyeSize, eyeballSize }) => {
		const wrapper = el;
		const eyeball = el.querySelector(".eyeball");

		// 눈 위치 및 크기
		wrapper.style.width = `${eyeSize * scaleX}px`;
		wrapper.style.height = `${eyeSize * scaleY}px`;
		wrapper.style.left = `${(x / baseWidth) * 100}%`;
		wrapper.style.top = `${(y / baseHeight) * 100}%`;

		// 눈동자 비율로 설정
		eyeball.style.width = `${(eyeballSize / eyeSize) * 100}%`;
		eyeball.style.height = `${(eyeballSize / eyeSize) * 100}%`;
	});
}

function setupEyeballMotion() {
	let pendingAnimation = null;

	document.addEventListener("mousemove", (e) => {
		if (pendingAnimation) cancelAnimationFrame(pendingAnimation);

		pendingAnimation = requestAnimationFrame(() => {
			const groups = {
				group1: document.querySelectorAll(".eye-group-1"),
				group2: document.querySelectorAll(".eye-group-2")
			};

			Object.values(groups).forEach(eyeWrappers => {
				const centers = Array.from(eyeWrappers).map(wrapper => {
					const rect = wrapper.getBoundingClientRect();
					return {
						el: wrapper.querySelector(".eyeball"),
						centerX: rect.left + rect.width / 2,
						centerY: rect.top + rect.height / 2,
						rect
					};
				});

				const avgX = centers.reduce((sum, c) => sum + c.centerX, 0) / centers.length;
				const avgY = centers.reduce((sum, c) => sum + c.centerY, 0) / centers.length;

				const dx = e.clientX - avgX;
				const dy = e.clientY - avgY;
				const angle = Math.atan2(dy, dx);

				centers.forEach(({ el, rect }) => {
					const eyeRadius = rect.width / 2;
					const pupilRadius = el.clientWidth / 2;
					const maxMove = eyeRadius - pupilRadius;

					const offsetX = Math.cos(angle) * maxMove;
					const offsetY = Math.sin(angle) * maxMove;

					el.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
				});
			});
		});
	});
}

document.querySelector('.arrow-left').addEventListener('click', () => {
	window.location.href = 'page3.html';
});

document.querySelector('.arrow-right').addEventListener('click', () => {
	window.location.href = 'page2.html';
});
