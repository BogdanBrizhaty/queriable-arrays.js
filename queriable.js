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
        //Array.prototype.GroupBy = function (expression) {
        //    return GroupByFunc(this, expression);
        //}
        Array.prototype.Skip = function (amount) {
            return SkipFunc(this, amount);
        }
        Array.prototype.Take = function (amount) {
            return TakeFunc(this, amount);
        }
        Array.prototype.All = function (predicate) {
            return AllFunc(this, predicate);
        }
        Array.prototype.Select = function (selectorFunc) {
            SelectFunc(this, selectorFunc);
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

    function SkipFunc(source, amount) {
        return source.slice(amount); 
    }

    function TakeFunc(source, amount) {
        return source.slice(0, amount);
    }

    function AllFunc(source, predicate) {
        let valid = true;
        ForEachFunc(source, function (e) {
            valid = predicate(e);
        });
        return valid;
    }
    function SelectFunc(source, selector) {
        let selected = [];
        ForEachFunc(source, function (element) {
            selected.push(selector(element));
        });
        return selected;
    }
}

var Records = [
    {
        Id: 1,
        Name: 'Obj1'
    },
    {
        Id: 2,
        Name: 'Obj2'
    },
    {
        Id: 3,
        Name: 'Obj3'
    }
];

var Notes = [
    {
        Id: 1,
        Note: 'note 1',
        RecordId: 1
    },
    {
        Id: 2,
        Note: 'note 2',
        RecordId: 2
    },
    {
        Id: 3,
        Note: 'note 3',
        RecordId: 1
    }
];

// entities
{
    function Joined(groups) {
        let self = this;
        console.log(groups);
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