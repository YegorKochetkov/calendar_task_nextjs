import React from "react";

export const useLocale = () => {
	const [locale, setLocale] = React.useState("en-US");

	React.useEffect(() => {
		setLocale(navigator.language);
	}, []);

	return locale;
};
