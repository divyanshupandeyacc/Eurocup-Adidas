import React, { useRef } from 'react';

const adNotify = {
	Toast: (err) => {
		return <NotifyToast msg={err} />;
	},
};

// notification custom component
const NotifyToast = (props) => {
	const ref = useRef(null);
	const close = (event) => {
		ref.current.style.display = 'none';
	};
	return (
		<div
			className='ad-notification-wrapper bg-brand-color-3'
			ref={ref}
			onClick={(event) => {
				close();
			}}>
			<div className='ad-notification-content text-d-brand-color space-m-3'>
				{props.msg}
			</div>
		</div>
	);
};

export default adNotify;
