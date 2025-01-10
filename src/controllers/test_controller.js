
class testController {
    _testService;
    constructor(testService) {
        this._testService = testService;
    }

    getDataController = async (req,res,next) => {
        try {
            await this._testService.getData()
        } catch (error) {
            console.log("error")
        }
    }

}

module.exports = testController;