import React from 'react';
const themes = {
	light: {
		foreground: '#000000',
		background: '#eeeeee',
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222',
	},
};

const ThemeContext = React.createContext({
	theme: themes.dark, // default value,
	toggleTheme: () => { },
}
);

const UserContext = React.createContext({
	name: 'Guest',
});

export default class ReactContextDemo extends React.Component {
	constructor(props) {
		super(props);
		this.toggleTheme = () => {
			this.setState(state => ({
				theme:
					state.theme === themes.dark
						? themes.light
						: themes.dark,
			}));
		};

		// State also contains the updater function so it will
		// be passed down into the context provider
		this.state = {
			theme: themes.light,
			toggleTheme: this.toggleTheme,
		};
	}
	render() {
		const signedInUser = {
			name: 'pip',
		}
		return (
			<ThemeContext.Provider value={this.state}>
				<UserContext.Provider value={signedInUser}>
					<Layout />
				</UserContext.Provider>
			</ThemeContext.Provider>
		);
	}
}
function Layout() {
	return (
		<div>
			<Sidebar />
			<Content />
		</div>
	);
}
function Sidebar() {
	return (
		<div>
			side bar...
		  </div>
	)
}
function Content() {
	return (
		<ThemeContext.Consumer>
			{(theme, toggleTheme) => (
				<UserContext.Consumer>
					{user => (
						<ProfilePage user={user} theme={theme} />
					)}
				</UserContext.Consumer>
			)}
		</ThemeContext.Consumer>
	);
}
function ProfilePage(props) {
	console.log('props', props);
	return (
		<div style={{ background: props.theme.theme.background }} onClick={props.theme.toggleTheme}>
			{props.user.name}
		</div>
	)
}
