import Ux from 'ux';

class RxOp {
    private promise: Function = () => undefined;
    private success: Function = () => {
    };
    private failure: Function = () => {
    };
    private validate: Function = () => true;
    private reference: any;
    private loading: String = undefined;

    private constructor(reference: any) {
        this.reference = reference;
    }

    static from(reference: any) {
        if (!reference) {
            console.error("[Zero Rx] Input 'reference' must be valid.");
        }
        return new RxOp(reference);
    }

    rx(op: any = {}) {
        if (op.success) this.success = op.success;
        if (op.failure) this.failure = op.failure;
        if (op.promise) this.promise = op.promise;
        if (op.validate) this.validate = op.validate;
        return this;
    }

    rxValidate(validate: Function) {
        this.validate = validate;
        return this;
    }

    rxPromise(promise: Function) {
        this.promise = promise;
        return this;
    }

    rxLoading(loading: String) {
        this.loading = loading;
        return this;
    }

    rxSuccess(success: Function) {
        this.success = success;
        return this;
    }

    rxFailure(failure: Function) {
        this.failure = failure;
        return this;
    }

    /**
     * 生成执行器
     * @returns {() => any}
     */
    bind() {
        const executor = this._options();
        const ref = this.reference;
        const refLoading = this.loading;
        return () => Ux.rxSubmit(ref, refLoading, executor);
    };

    reset() {
        const executor = this._options();
        const ref = this.reference;
        return () => executor.success(ref);
    }

    private _options() {
        const executor: any = {};
        executor.success = this.success;
        executor.failure = this.failure;
        executor.promise = this.promise;
        executor.validate = this.validate;
        return executor;
    }
}

export default RxOp;