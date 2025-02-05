import React, { useContext } from 'react';
import { ContextApi } from '../AuthProvider/AuthContext';

const UserHome = () => {
	const {user} = useContext(ContextApi)
	return (
		<div>
			<h2 className='text-3xl'>
				<span>Hi, Welcome </span>
				{
					user?.displayName ? user.displayName : 'Back'
				}
			</h2>
		</div>
	);
};

export default UserHome;