import React, {useRef, useEffect} from 'react';

const WithModal = ({ children, isOpened, onClose, onSelectClickHandler }) => {
	const wrapperRef = useRef(null);
	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			onClose()
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		console.log('useEffect at ConvertSide');
		return () => document.body.removeEventListener('mousedown', handleClickOutside)
	}, [isOpened])

	return (
		<div
			ref={wrapperRef}
			className={isOpened ? 'side-switcher-item arrow active' : 'side-switcher-item arrow'}
			onClick={onSelectClickHandler}
		>
			{isOpened && children}
		</div>
	);
};

export default WithModal;