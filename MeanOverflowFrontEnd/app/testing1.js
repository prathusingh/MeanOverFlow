/**
 * Created by root on 7/14/15.
 */
var x=[{'a':10},{'b':20}, {'c':30}];
/*
x.forEach(function(ele)
{
    if(ele.a==10)
    {
        ele.key='d';
        ele.val=80

    }
})

*/
x.push({'d':50});
console.log(x);

console.log(x.pop());