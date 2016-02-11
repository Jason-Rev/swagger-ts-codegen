/// <reference path="../typings/main.d.ts"/>


declare module commander {
    interface ICommandStatic {
        /**
         * Initialize a new `Command`.
         *
         * @param {String} name
         * @api public
         */
        new (name?:string):ICommand;
    }

    interface ICommand extends NodeJS.EventEmitter {
        arguments(str:string):ICommand;
    }
}
