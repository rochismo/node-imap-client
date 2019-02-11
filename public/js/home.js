async function loadEmails(data) {
	const box = data.trim();
	const val = await fetch("/fetch?box="+box);
	const emails = await val.json();
	let html = ``;
	emails.forEach(email => {
		const body = email[0].body;
		const {from, subject} = body;
		html += `<tr class="unread">
		<td class="inbox-small-cells">
				<input type="checkbox" class="mail-checkbox">
		</td>
		<td class="view-message  dont-show">${from[0]}</td>
		<td class="view-message ">${subject[0]}</td>
</tr>`
	});
	document.querySelector("#emails").innerHTML = html.length == 0 ? "<h2>No emails</h2>" : html;
}
	//active class - end
  // ---------------------