type RequestsResult = {
	data: any,
	status: number
}

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
	const requests = urls.map(url => 
			fetch(url)
					.then(async (response) => ({
							data: await response.json(),
							status: response.status
					}))
					.catch(() => ({
							data: null,
							status: 500 // Статус 500 для неудачных запросов
					}))
	);
	
	const results = await Promise.allSettled(requests);

	// Возвращаем только успешные результаты в порядке завершения запросов
	return results
			.filter(result => result.status === 'fulfilled')
			.map(result => result.value);
}

module.exports = { fetchAll };
