










AUI.add(
	'portal-available-languages',
	function(A) {
		var available = {};

		var direction = {};

		

			available['pl_PL'] = 'polski (Polska)';
			direction['pl_PL'] = 'ltr';

		

			available['de_DE'] = 'niemiecki (Niemcy)';
			direction['de_DE'] = 'ltr';

		

			available['en_GB'] = 'angielski (Wielka Brytania)';
			direction['en_GB'] = 'ltr';

		

		Liferay.Language.available = available;
		Liferay.Language.direction = direction;
	},
	'',
	{
		requires: ['liferay-language']
	}
);