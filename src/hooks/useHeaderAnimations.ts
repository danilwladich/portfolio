import React, { useLayoutEffect } from 'react';

export function useHeaderAnimations(headerRef: React.RefObject<HTMLElement>, fullScreenRef: React.RefObject<HTMLImageElement>, headerBgRef: React.RefObject<HTMLDivElement>, aboutRef: React.RefObject<HTMLButtonElement>, skillsRef: React.RefObject<HTMLButtonElement>, worksRef: React.RefObject<HTMLButtonElement>, hobbyRef: React.RefObject<HTMLButtonElement>) {
	
	const ScrollTo = (props: string) => {
		const element = document.querySelector<HTMLElement>(props);
		if (element != null) {
			window.requestAnimationFrame(() => {
				window.scrollBy({
					top: element.getBoundingClientRect().y - 55,
					behavior: 'smooth'
				});
			})
		}
	}


	useLayoutEffect(() => {


		let windowHeight: number = Math.max(window.innerHeight, document.documentElement.clientHeight);
		window.addEventListener('resize', () => {
			windowHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
		});

		document.addEventListener('scroll', scrollAnimate);
		function scrollAnimate() {
			const scroll: number = window.pageYOffset;
			const translateHeader: string = (40 - (40 / windowHeight * scroll)) + 'px';
			const translateFullScreen: string = (scroll / 2) + 'px';
			if (scroll >= 0 && scroll < windowHeight) {
				window.requestAnimationFrame(() => {
					if (headerRef.current != null) {
						headerRef.current.style.top = translateHeader;
					}
					if (fullScreenRef.current != null) {
						fullScreenRef.current.style.top = translateFullScreen;
					}
				})
			}
			if (scroll >= windowHeight) {
				if (headerRef.current != null) {
					headerRef.current.style.top = '0px';
				}
				if (headerBgRef.current != null) {
					headerBgRef.current.classList.add('active')
				}
			} else {
				if (headerBgRef.current != null) {
					headerBgRef.current.classList.remove('active')
				}
			}
		}


		const sections = document.querySelectorAll('section');
		window.addEventListener('scroll', highlightLink);
		function highlightLink() {
			if (sections != null) {
				for (let index = 0; index < sections.length; index++) {
					const scroll: number = window.pageYOffset;
					const section: HTMLElement = sections[index];
					const sectionHeight: number = section.offsetHeight;
					const sectionOffsetTop: number = offsetTop(section);

					if (scroll >= (sectionOffsetTop - 55 - windowHeight * 1 / 3) && scroll < (sectionHeight + sectionOffsetTop - 55 - windowHeight * 1 / 3)) {
						if (section.classList.value == 'about' && aboutRef.current != null) {
							aboutRef.current.classList.add('active')
						}
						if (section.classList.value == 'skills' && skillsRef.current != null) {
							skillsRef.current.classList.add('active')
						}
						if (section.classList.value == 'works' && worksRef.current != null) {
							worksRef.current.classList.add('active')
						}
						if (section.classList.value == 'hobby' && hobbyRef.current != null) {
							hobbyRef.current.classList.add('active')
						}
					} else {
						if (section.classList.value == 'about' && aboutRef.current != null) {
							aboutRef.current.classList.remove('active')
						}
						if (section.classList.value == 'skills' && skillsRef.current != null) {
							skillsRef.current.classList.remove('active')
						}
						if (section.classList.value == 'works' && worksRef.current != null) {
							worksRef.current.classList.remove('active')
						}
						if (section.classList.value == 'hobby' && hobbyRef.current != null) {
							hobbyRef.current.classList.remove('active')
						}
					}
				}
			}
			function offsetTop(el: HTMLElement) {
				const rect: DOMRect = el.getBoundingClientRect();
				const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
				return rect.top + scrollTop;
			}
		}


	}, [headerRef, fullScreenRef, headerBgRef, aboutRef, skillsRef, worksRef, hobbyRef])


	return { ScrollTo }
}