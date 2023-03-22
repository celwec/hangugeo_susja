var options = {
	"type": "",
	"range": {
		"min": 0,
		"max": 0
	},
	"direction": "",
	"amount": 0
};

var cards = {
	"content": {
		"question": "",
		"answer": ""
	},
	"current": 0
};

var results = {
	"correct": 0,
	"wrong": 0,
	"percent": 0
};

var sino_numbers = [
	"영",
	"일",
	"이",
	"삼",
	"사",
	"오",
	"육",
	"칠",
	"팔",
	"구"
];

var native_numbers_ones = [
	"",
	"하나",
	"둘",
	"셋",
	"넷",
	"다섯",
	"여섯",
	"일곱",
	"여덟",
	"아홉",
];

var native_numbers_tens = [
	"",
	"열",
	"스물",
	"서른",
	"마흔",
	"쉰",
	"예순",
	"일흔",
	"여든",
	"아흔"
];

document.getElementById("cheatsheet_btn").addEventListener("click", function() {turn_page("cheatsheet");});
document.getElementById("return_btn").addEventListener("click", function() {turn_page("options");});
document.getElementById("return2_btn").addEventListener("click", function() {turn_page("options");});
document.getElementById("start_btn").addEventListener("click", quiz);
document.getElementById("answer_btn").addEventListener("click", answer);
document.getElementById("num_questions").addEventListener("keypress", enter_quiz);
document.getElementById("answer_field").addEventListener("keypress", enter_answer);
document.getElementById("radio_type_sino").addEventListener("click", native_listener);
document.getElementById("radio_type_native").addEventListener("click", native_listener);

reset_options_menu();

function reset_options_menu() {
	document.getElementById("radio_type_sino").checked = true;
	document.getElementById("radio_type_native").checked = false;

	document.getElementById("ones").checked = true;
	document.getElementById("tens").checked = false;
	document.getElementById("hundreds").checked = false;
	document.getElementById("thousands").checked = false;
	document.getElementById("all").checked = false;

	document.getElementById("ktd").checked = true;
	document.getElementById("dtk").checked = false;

	document.getElementById("num_questions").value = 10;
}
function native_listener() {
	let node_native = document.getElementById("radio_type_native");
	let node_ones = document.getElementById("ones");
	let node_hundreds = document.getElementById("hundreds");
	let node_thousands = document.getElementById("thousands");

	if (node_native.checked) {
		if (node_hundreds.checked || node_thousands.checked) {
			node_ones.checked = true;
		}

		node_hundreds.disabled = true;
		node_thousands.disabled = true;

	} else {
		node_hundreds.disabled = false;
		node_thousands.disabled = false;
	}

	node_hundreds.parentNode.classList.toggle("faded");
	node_thousands.parentNode.classList.toggle("faded");
}

function set_type() {
	let node_sino = document.getElementById("radio_type_sino");
	let node_native = document.getElementById("radio_type_native");

	if (!node_sino.checked && !node_native.checked) {
		// return error here
		return;
	}

	if (node_sino.checked) {
		return "sino";
	} else if (node_native.checked) {
		return "native";
	}
}
function set_range() {
	let node_native = document.getElementById("radio_type_native");
	let node_ones = document.getElementById("ones");
	let node_tens = document.getElementById("tens");
	let node_hundreds = document.getElementById("hundreds");
	let node_thousands = document.getElementById("thousands");
	let node_all  = document.getElementById("all");

	if (!node_ones.checked &&
		!node_tens.checked &&
		!node_hundreds.checked &&
		!node_thousands.checked &&
		!node_all.checked) {
			// return error here
			return;
		}

	if (node_ones.checked) {
		if (node_native.checked) {
			return {"min": 1, "max": 9};
		} else {
			return {"min": 0, "max": 9};
		}
	} else if (node_tens.checked) {
		return {"min": 10, "max": 99}
	} else if (node_hundreds.checked) {
		return {"min": 100, "max": 999}
	} else if (node_thousands.checked) {
		return {"min": 1000, "max": 9999}
	} else if (node_all.checked) {
		if (node_native.checked) {
			return {"min": 1, "max": 99}
		} else {
			return {"min": 0, "max": 9999}
		}
	}
}
function set_direction() {
	let node_dtk = document.getElementById("dtk");
	let node_ktd = document.getElementById("ktd");

	if (!node_dtk.checked && !node_ktd.checked) {
		// return error here
		return;
	}

	if (node_dtk.checked) {
		return "dtk";
	} else if (node_ktd.checked) {
		return "ktd";
	}
}
function set_amount() {
	let node_amount = document.getElementById("num_questions");
	let amount = parseInt(node_amount.value);

	if (isNaN(amount) || amount < 1) {
		return 0;
	}

	return amount;
}

function turn_page(page) {
	let node_options = document.getElementById("options");
	let node_cheatsheet = document.getElementById("cheatsheet");
	let node_cards = document.getElementById("cards");
	let node_results = document.getElementById("results");

	switch (page) {
		case "options":
			node_options.classList.remove("hidden");
			node_cheatsheet.classList.add("hidden");
			node_cards.classList.add("hidden");
			node_results.classList.add("hidden");
			break;
		case "cheatsheet":
			node_options.classList.add("hidden");
			node_cheatsheet.classList.remove("hidden");
			node_cards.classList.add("hidden");
			node_results.classList.add("hidden");
			break;
		case "cards":
			node_options.classList.add("hidden");
			node_cheatsheet.classList.add("hidden");
			node_cards.classList.remove("hidden");
			node_results.classList.add("hidden");
			break;
		case "results":
			node_options.classList.add("hidden");
			node_cheatsheet.classList.add("hidden");
			node_cards.classList.add("hidden");
			node_results.classList.remove("hidden");
			break;
		default:
			break;
	}
}

function split_number(number) {
	split = {
		ones: null,
		tens: null,
		hundreds: null,
		thousands: null
	};

	let length = number.toString().length;
	
	switch (length) {
		case 1:
			split.ones = number.toString()[0];
			break;
		case 2:
			split.ones = number.toString()[1];
			split.tens = number.toString()[0];
			break;
		case 3:
			split.ones = number.toString()[2];
			split.tens = number.toString()[1];
			split.hundreds = number.toString()[0];
			break;
		case 4:
			split.ones = number.toString()[3];
			split.tens = number.toString()[2];
			split.hundreds = number.toString()[1];
			split.thousands = number.toString()[0];
			break;
		default:
			break;
	}

	return split;
}
function get_random_number(min, max) {
	return Math.round((Math.random() * (max - min)) + min)
}

function convert_dec_to_sino(number) {
	let korean = "";
	let split = split_number(number);

	if (split.thousands) {
		if (split.thousands != "0" && split.thousands != "1") {
			korean += sino_numbers[split.thousands];
		}
		if (split.thousands != "0") {
			korean += "천";
		}
	}

	if (split.hundreds) {
		if (split.hundreds != "0" && split.hundreds != "1") {
			korean += sino_numbers[split.hundreds];
		}
		if (split.hunedreds != "0") {
			korean += "백";
		}
	}

	if (split.tens) {
		if (split.tens != "0" && split.tens != "1") {
			korean += sino_numbers[split.tens];
		}
		if (split.tens != "0") {
			korean += "십";
		}
	}

	if (!split.tens || split.ones != "0") {
		korean += sino_numbers[split.ones];
	}

	return korean;
}
function convert_dec_to_native(number) {
	let korean = "";
	let split = split_number(number);

	if (split.tens) {
		korean += native_numbers_tens[split.tens];
	}

	if (!split.tens || split.ones != "0") {
		korean += native_numbers_ones[split.ones];
	}

	return korean;
}

function set_card() {
	let content = {
		question: "",
		answer: ""
	};

	let number = get_random_number(options.range.min, options.range.max);
	let korean = "";

	switch (options.type) {
		case "sino":
			korean = convert_dec_to_sino(number);
			break;
		case "native":
			korean = convert_dec_to_native(number);
			break;
		default:
			break;
	}

	switch (options.direction) {
		case "dtk":
			content.question = number;
			content.answer = korean;
			break;
		case "ktd":
			content.question = korean;
			content.answer = number;
			break;
		default:
			break;
	}

	return content;
}

function print_card() {
	node_answer_field = document.getElementById("answer_field");
	node_question_card = document.getElementById("question_card");
	node_question_card.innerText = cards.content.question;

	
	if (options.direction === "ktd") {
		node_answer_field.placeholder = "Enter Decimal";
	} else {
		node_answer_field.placeholder = "Enter in Korean";
	}
}
function print_results() {
	let node_results_amount = document.getElementById("results_amount");
	let node_results_correct = document.getElementById("results_correct");
	let node_results_wrong = document.getElementById("results_wrong");
	let node_results_percent = document.getElementById("results_percent");

	node_results_amount.innerText = options.amount;
	node_results_correct.innerText = results.correct;
	node_results_wrong.innerText = results.wrong;
	node_results_percent.innerText = results.percent.toFixed(2) + "%";
}

function next() {
	if (cards.current >= options.amount) {
		print_results();
		turn_page("results");
		return;	
	}

	cards.content = set_card();
	cards.current += 1;

	print_card();
}
function answer() {
	let node_answer_field = document.getElementById("answer_field");
	let answer = node_answer_field.value;

	if (!answer || answer.length === 0) {
		return;
	}

	if (options.direction === "ktd") {
		answer = parseInt(answer);
		if (isNaN(answer)) {
			return;
		}
	}

	if (answer === cards.content.answer) {
		results.correct += 1;
	} else {
		results.wrong += 1;
	}

	results.percent = 100 * results.correct / options.amount;
	node_answer_field.value = "";
	next();
}
function quiz() {
	options.type = set_type();
	options.range = set_range();
	options.direction = set_direction();
	options.amount = set_amount();

	if (options.amount < 1) {
		return;
	}

	cards.current = 0;

	results.correct = 0;
	results.wrong = 0;
	results.percent = 0;

	next();
	turn_page("cards");
}
function enter_quiz(ev) {
	if (ev.key != "Enter") {
		return;
	}

	quiz();
}
function enter_answer(ev) {
	if (ev.key != "Enter") {
		return;
	}

	answer();
}