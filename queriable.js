// JavaScript source code

// extension initialization
{
    function initialize() {
        // Array extension initialization
        Array.prototype.Where = function (lambda) {
            return WhereFunc(this, lambda);
        }
        Array.prototype.FirstOrDefault = function (lambda) {
            return FirstOrDefaultFunc(this, lambda);
        }
        Array.prototype.First = function (lambda) {
            return FirstFunc(this, lambda);
        }
        Array.prototype.LastOrDefault = function (lambda) {
            return LastOrDefaultFunc(this, lambda);
        }
        Array.prototype.Last = function (lambda) {
            return LastFunc(this, lambda);
        }
        Array.prototype.Count = function (lambda) {
            return CountFunc(this, lambda);
        }
        Array.prototype.Any = function (lambda) {
            return AnyFunc(this, lambda);
        }
        Array.prototype.ForEach = function (callback) {
            ForEachFunc(this, callback);
        }
        Array.prototype.GroupBy = function (expression) {
            return GroupByFunc(this, expression);
        }
    }
}

// functions
{
    function WhereFunc(source, lambda) {
        return source.filter(lambda);
    }

    function FirstOrDefaultFunc(source, lambda) {
        let filtered = typeof (lambda) === 'undefined' ? source : WhereFunc(source, lambda);
        if (typeof (filtered[0]) === 'undefined') {
            return null;
        }
        return filtered[0];
    }

    function FirstFunc(source, lambda) {
        let result = FirstOrDefaultFunc(source, lambda);
        if (result === null) {
            throw new Error('Sequence contains no elements!');
        }
    }

    function AnyFunc(source, lambda) {
        if (typeof (lambda) === 'undefined') {
            return source.length > 0;
        }
        return WhereFunc(source, lambda).length > 0;
    }

    function LastOrDefaultFunc(source, lambda) {
        let filtered = typeof (lambda) === 'undefined' ? source : WhereFunc(source, lambda);
        if (filtered.length == 0) {
            return null;
        }
        return filtered[filtered.length - 1];
    }

    function LastFunc(source, lambda) {
        let found = LastOrDefaultFunc(source, lambda);
        if (found === null) {
            throw new Error('Sequence contains no elements!');
        }
        return found;
    }

    function CountFunc(source, lambda) {
        if (typeof (lambda) === 'undefined') {
            return source.length;
        }
        return WhereFunc(source, lambda).length;
    }

    function ForEachFunc(source, callback) {
        for (let index = 0; index < source.length; index++) {
            callback(source[index], index);
        }
    }

    function GroupByFunc(source, fieldExpression) {
        var exprBody = fieldExpression.toString();
        // todo: modify expression checker
        if (!/.+=>.+\..+/.test(exprBody)) {
            throw new Error('Invalid expression!');
        }
        var lastExprMember = exprBody.match(/\..+/)[0].substr(1);
        return groupByFieldName(source, lastExprMember);
    }
    function groupByFieldName(source, fName) {
        var groups = [];
        for (let i = 0; i < source.length; i++) {
            var current = eval('source[i].' + fName);
            if (current) {
                // if there is no groupping key for now and new one found
                // add to the groupping array
                let groupping = FirstOrDefaultFunc(groups, g => g.Key === current);
                if (groupping === null) {
                    groups.push(new Group(current, source[i]));
                }
                // else if it is already
                else {
                    groupping.Values.push(source[i]);
                }
            }
        }
        return groups;
    }
}

// entities
{
    function Joined(groups) {
        let self = this;

        for (let i = 0; i < groups.length; i++) {
            eval('self.' + groups[i].Key + ' = groups[i].Values');
        }
    }

    function Group(key, value) {
        let self = this;
        self.Key = key;
        self.Values = [value];
    }
}