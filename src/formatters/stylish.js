import _ from "lodash";

const symbols = {
	added: "+",
	deleted: "-",
	unchanged: " ",
	nested: " ",
};

const makeIndent = (depth) => {
	const str = " ";
	return str.repeat(depth * 4 - 2);
};

const stringify = (value, depth = 1) => {
	if (!_.isObject(value)) {
		return value;
	}
	const keys = Object.keys(value);
	const getKeys = keys.map(
		(key) =>
			`${makeIndent(depth + 1)}  ${key}: ${stringify(
				value[key],
				depth + 1
			)}`
	);
	return `{\n${getKeys.join("\n")}\n  ${makeIndent(depth)}}`;
};

const getStylishFormat = (value, depth = 1) => {
	switch (value.type) {
		case "added":
		case "deleted":
		case "unchanged":
			return `${makeIndent(depth)}${symbols[value.type]} ${
				value.key
			}: ${stringify(value.value, depth)}`;
		case "changed":
			return `${makeIndent(depth)}${symbols.deleted} ${
				value.key
			}: ${stringify(value.valueBefore, depth)}\n${makeIndent(depth)}${
				symbols.added
			} ${value.key}: ${stringify(value.valueAfter, depth)}`;
		case "nested":
			return `${makeIndent(depth)}  ${value.key}: {\n${value.children
				.map((val) => getStylishFormat(val, depth + 1))
				.join("\n")}\n ${makeIndent(depth)} }`;
		default:
			throw new Error(`Unknown type: ${value.type}`);
	}
};

export default (diff) =>
	`{\n${diff.map((value) => getStylishFormat(value, 1)).join("\n")}\n}`;