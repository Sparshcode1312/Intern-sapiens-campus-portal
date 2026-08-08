const Requirement = require('../models/Requirement');

// @desc    Get Regional Head dashboard stats (counts + recent + by-department)
// @route   GET /api/requirements/dashboard-stats
// @access  Private (Regional Head)
const getDashboardStats = async (req, res) => {
  try {
    const [total, pending, approved, memosIssued] = await Promise.all([
      Requirement.countDocuments({}),
      Requirement.countDocuments({ status: 'Pending' }),
      Requirement.countDocuments({ status: 'Approved' }),
      Requirement.countDocuments({ status: 'Approved', currentStage: 'Memo Issued' }),
    ]);

    const recent = await Requirement.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status department centreName currentStage createdAt');

    const departmentAgg = await Requirement.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
    ]);

    const departments = ['Marketing', 'HR', 'Operations', 'Academics', 'Events', 'Administration'];
    const byDepartment = departments.map((name) => {
      const match = departmentAgg.find((d) => d._id === name);
      return { department: name, count: match ? match.count : 0 };
    });

    return res.json({
      notesheets: total,
      pending,
      approved,
      memosIssued,
      recent,
      byDepartment,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return res.status(500).json({ message: 'Unable to load dashboard stats' });
  }
};

// @desc    Get requirements, optionally filtered by status/department
// @route   GET /api/requirements?status=Pending&department=HR
// @access  Private
const getRequirements = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.department) filter.department = req.query.department;

    const requirements = await Requirement.find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email role');

    return res.json(requirements);
  } catch (error) {
    console.error('Get requirements error:', error);
    return res.status(500).json({ message: 'Unable to load requirements' });
  }
};

module.exports = { getDashboardStats, getRequirements };
