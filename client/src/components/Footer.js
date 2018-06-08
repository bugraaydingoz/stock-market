import React from 'react'
import './Footer.css'

const Footer = props => {
	return (
		<div className="footer">
			<a
				href="https://bugraaydingoz.com/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<p>
					Made by Bugra Aydingoz with{' '}
					<i className="fa fa-heart" aria-hidden="true" />
				</p>
			</a>
		</div>
	)
}

export default Footer
